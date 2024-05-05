# Google-Docs-as-Database
With the help of Google App Script, building a script to convert blog posts written in Google Docs into an array
# Headless CMS for a small blog using Google Docs using AppScript

1. Make a WorkFolder and inside it you have to create your Google Docs (your posts).
2. Also create a TempFolder inside WorkFolder for temporarily copying your posts when the script runs.
![folders](/assets/folders.png)
## For the script to work, you have to strictly follow some writing rules:
1. Use a single font (default Arial is good) and use one of these three font sizes : 11(default),12,13.
2. For metadata such as titles, id, meta_description, meta_title, slug, image, alt, etc... use like #title, #id, #slug, etc.
3. Start from the top. Write #id always at the top. This id is used to sort the array, so maybe write 0,1,2... Highest id will be at the index 0 of the array and lowest id will be at the last index of the array. 
4. Write keywords and tags with comma separation, so that they will form a nice array in the output. (only #tags and #keywords are supported in this code.)
   1. tags: movies, great movies, best movies
   2. keywords: shawshank redemption, greatest movie ever, morgan freeman
5. For inserting image, write the actual location from your root folder in font size 16.
	1. /assets/0/shawshank.webp (in font size 16)
6. For image alt, write in font size 14.
7. For Image source and Attribution for the image or Caption, using font size 10
8. For image that should float left of the text, use font size 16 and make it bold
9. For image that should float right of the  text, use font size 16 and make it italic
10. For links, write like this
	1. I want you to visit$https://google.com, and here is what I am talking about.
	2. Also for more%information%please%visit$https://somewebsite.com and that will be it.
	3. Use % for space if you want the whole thing to be a link, and dont give any space before and after $.
	4. This will render <a href= "after the $ sign" className= "art-lnk"> before the $ sign</a>. Use your own class-name.
11. For bold text, write it in bold.
12. For italic text, write it in italic.
13. For special or highlight text, you can write it in underline.
![post 1 in google docs](/assets/post1.png)
![post 2 in google docs](/assets/post2.png)
![post 3 in google docs](/assets/post3.png)
![post 4 in google docs](/assets/post4.png)

### When changing paragraphs (and thus styles), press enter first and then change the font size or font style.
/assets/5/dog.webp (since this is fontsize 16 and now for alt you need fontsize 14, press enter first and then only change the fontsize. If you change the font size first staying in that image paragraph and then press enter, the script wouldn't catch the below item as imgalt. So remember to press enter first for new paragraph and then only change the styling.)
 
1. The script will return a download link for the array. Array is created inside your WorkFolder. If you run the script more than once, multiple array.js will be created. Choose the latest one looking at the time of creation.
2. Notice that counter in the array? It's there to maintain the order. To display it in frontend, iterate and grab the respective thing.
3. Note: You need to do dangerously render inner HTML for this. Totally safe though.
4. Thanks. :)
