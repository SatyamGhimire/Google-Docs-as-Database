function allofit() {
  const workFolderId = "YOUR_WORKFOLDER_ID"; // your main working folder id
  const tempFolderId = "YOUR_TEMPFOLDER_ID"; // your temp folder id where files will be copied temporariliy
  const workFolder = DriveApp.getFolderById(workFolderId); // grabbing that work folder
  const tempFolder = DriveApp.getFolderById(tempFolderId); // grabbing that temp folder
  var filesWork = workFolder.getFilesByType(MimeType.GOOGLE_DOCS); // getting all files inside of the work folder

  //This is making the copy of the files to the temp folder
  var count = 0;
  while (filesWork.hasNext()){
    count++;
    const file = filesWork.next();
    const destination = DriveApp.getFolderById(tempFolderId);
    file.makeCopy(destination);
  }

  //Now the main work begins here
  var files = tempFolder.getFilesByType(MimeType.GOOGLE_DOCS);
  while (files.hasNext()){
    var file = files.next();
    var doc = DocumentApp.openById(file.getId());
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();
    var i = 1;
    const linkRegex = /(\w+([%:.|_@\/]+\w+)*)\$(\w+([%:.|_@\/]+\w+)*)/;
    const tagRegex = /#(\w+)\s*:\s*(.*)/i; // to detect the #tags: like #slug: and #image: 
    const tagssRegex = /#(tags?)\s*:\s*(.*)/i; // for tags of the post
    const keywordsRegex = /#(keywords?)\s*:\s*(.*)/i; //for keywords for SEO
    
    paragraphs.forEach(function(paragraph) {
      var text = paragraph.getText();
      
      // Check for underlined sections and replace them with formatted links
      var match;
      while ((match = linkRegex.exec(text)) !== null) {
        var linkText = match[1];
        var linkURL = match[3]; // URL is the second part after '$'
        var formattedLink = '<a href="' + linkURL + '" className="art-lnk">' + linkText + '</a>';
        text = text.replace(match[0], formattedLink);
      }
      var text = text.replace(/"/g, '\\\"'); // escaping double quotes
      // Apply identifiers based on paragraph formatting
      var fontSize = paragraph.asText().getFontSize();

      if (paragraph.isItalic()) {
        if (fontSize === 16){
          paragraph.setText("imgl" +  i + ': "'  + text + '",');          
        }
        else
          paragraph.setText("pi" + i + ': "'  + text + '",');
      } 
      else if (paragraph.isUnderline()){
        paragraph.setText("pu" + i + ': "'  + text + '",');
      }
      else if (paragraph.isBold()) {
        if(fontSize === 16){
          paragraph.setText("imgr" +  i + ': "'  + text + '",');
        }
        else
         paragraph.setText("pb" +  i + ': "'  + text + '",');
      } 
      else {
        if (fontSize === 16) {
            paragraph.setText("img" +  i + ': "'  + text + '",');
        } 
        else if (fontSize === 14) {
          paragraph.setText("imgalt" +  i + ': "'  + text + '",');
        }  
        else if (fontSize === 10) {
          paragraph.setText("imgby" +  i + ': "'  + text + '",');
        } 
        else {
          //Make sure that the tags are always on normal text, not bold and italic
          var matchTag = tagRegex.exec(text);

          if(matchTag){
            var matchTags = tagssRegex.exec(text);
            var matchKeywords = keywordsRegex.exec(text);

            function formatToArray(tagString) {
            var tags = tagString.split(',').map(function(tag) {
              return '"' + tag.trim() + '"';
              });
            return '[' + tags.join(', ') + '],';
            }
            if (matchTags){
              const title = matchTags[1];
              var after = (formatToArray(matchTags[2]));
              var temp = title +": " + after;
              text = text.replace(matchTags[0], temp);
              paragraph.setText(text);
            }
            else if (matchKeywords){
              const title = matchKeywords[1];
              var after = (formatToArray(matchKeywords[2]));
              var temp = title +": " + after;
              text = text.replace(matchKeywords[0], temp);
              paragraph.setText(text);
            }
            else{
              var temp = matchTag[1] + ": \"" + matchTag[2]+ "\",";
              text = text.replace(matchTag[0], temp);
              paragraph.setText(text);
            }
          }

          else{
            paragraph.setText("p" +  i + ': "'  + text + '",');
          }
        }
      }
      i++; // Increment the count
    });

    var text1 = body.getText();
    // Replace "%" with space
    text1 = "{\n" + text1.replace(/%/g, ' ') + "\n},";
    // Set the updated text back to the document
    const idRegex = /^\{\nid: ?"([^"]+?)"/;
    body.setText(text1);
    var matchId = idRegex.exec(text1);
    var newName;
    if(matchId){
      newName=matchId[1];
      doc.setName(newName);
    }
  }

  //Now that the file is formatted correctly as an array, now extracting it in the .js file
  var articlesString = "const articles = [\n";
  for(var i=count;i>=0;i--){
    var istr = i.toString();
    files=DriveApp.getFilesByName(istr);;
    if (files.hasNext()){
      var file = files.next();
      var doc = DocumentApp.openById(file.getId());
      var body = doc.getBody();
      var text = body.getText();
      articlesString = articlesString + text + "\n";
    }
  }
  articlesString = articlesString + "\n ]; \n export default articles;";
  var finalArray = workFolder.createFile('articles.js', articlesString, MimeType.JAVASCRIPT);
  var link = finalArray.getDownloadUrl();
  Logger.log('Articles exported to articles.js in the foldder with ID: ' + link);

  var newfiles = tempFolder.getFilesByType(MimeType.GOOGLE_DOCS);
  while (newfiles.hasNext()){
    var file=newfiles.next();
    file.setTrashed(true);
    Logger.log('File: '  + file.getName() + ' moved to Trash..');
  }
}