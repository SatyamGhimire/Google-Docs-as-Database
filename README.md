# Google-Docs-as-Database
With the help of Google App Script, building a script to convert blog posts written in Google Docs into an array
### Total identifiers excluding metadata (i is the counter).
	pi: Normal pargraph
	pii: Italic paragraph
	pbi: Bold paragraph
	pui: Highlighed paragraph
	imgi: Normal image
	imgli: Float left image
	imgri: Float right image
	imgalti: Alt for the image
	imgbyi: Image caption or attribution
 *You can use these identifiers to give your own styling to respective element. These descriptions are just what I found suitable for my blog, and I think this much is enough for a simple blog.*
 
 ### Not supported:
 	to have bold word or italic word inside normal paragraph and such
  	listing
*You can use these identifiers to give your own styling to respective element. These descriptions are just what I found suitable for my blog.*
1. Make a WorkFolder and inside it you have to create your Google Docs (your posts).
2. Also create a TempFolder inside WorkFolder for temporarily copying your posts when the script runs.
3. Copy paste the respective folder id in respective lines of code.
![folders](/assets/folders.png)
## For the script to work, you have to strictly follow some writing rules:
* Use a single font (default Arial is good) and use one of these three font sizes : 11(default),12,13.
* For metadata such as titles, id, meta_description, meta_title, slug, image, alt, etc... use like #title, #id, #slug, etc.
* Start from the top. Write #id always at the top. This id is used to sort the array, so maybe write 0,1,2... Highest id will be at the index 0 of the array and lowest id will be at the last index of the array. 
* Write keywords and tags with comma separation, so that they will form a nice array in the output. (only #tags and #keywords are supported in this code.)
   * tags: movies, great movies, best movies
   * keywords: shawshank redemption, greatest movie ever, morgan freeman
* For inserting image, write the actual location from your root folder in font size 16.
	* /assets/0/shawshank.webp (in font size 16)
* For image alt, write in font size 14.
* For Image source and Attribution for the image or Caption, using font size 10
* For image that should float left of the text, use font size 16 and make it bold
* For image that should float right of the  text, use font size 16 and make it italic
* For links, write like this
>I want you to visit$https://google.com, and here is what I am talking about. Also for more%information%please%visit$https://somewebsite.com and that will be it.
>Use % for space if you want the whole thing to be a link, and dont give any space before and after $.
>This will render <a href= /"after the $ sign" className= "art-lnk"> before the $ sign<//a>. Use your own class-name. Ignore the slashes in anchor tag.
* For bold text, write it in bold.
* For italic text, write it in italic.
* For special or highlight text, you can write it in underline.

### Look at the posts:

https://docs.google.com/document/d/1vUHWEvGvPPsieAzeTqVEWeZczzguV5q7F2VFgFOedZ0/edit?usp=sharing
https://docs.google.com/document/d/16bAWuJwfRADTwUKQrwak7AmCcYouGvWa6PYE0k3BVvc/edit?usp=sharing
https://docs.google.com/document/d/1zqb8G2Q44_QiWhTbYvU0XfY7DE5d7jeqOKpFTauq--E/edit?usp=sharing
https://docs.google.com/document/d/1dinpNeBLjkpfsbnsC9RKysz73kxH8qzYIt2K4GInmg0/edit?usp=sharing

### When changing paragraphs (and thus styles), press enter first and then change the font size or font style.
	/assets/5/dog.webp
(since this is fontsize 16 and now for alt you need fontsize 14, press enter first and then only change the fontsize. If you change the font size first staying in that image paragraph and then press enter, the script wouldn't catch the below item as imgalt. So remember to press enter first for new paragraph and then only change the styling.)
 
* The script will return a download link for the array. Array is created inside your WorkFolder. If you run the script more than once, multiple array.js will be created. Choose the latest one looking at the time of creation.
* Notice that counter in the array? It's there to maintain the order. To display it in frontend, iterate and grab the respective thing.
* Note: You need to do dangerously render inner HTML for this. Totally safe though.
* Look at the sample page and sample render content component that takes the array and render the content.
