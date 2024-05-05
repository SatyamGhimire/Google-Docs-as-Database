import articles from "/whatarraywilllookline.js";
import renderContent from "/samplerendercontent.js";
const thisid = "2";
const thisarticle = articles.find(article => article.id === thisid);

const thiscontent =renderContent(thisarticle);
export const metadata={
  title: thisarticle.m_title,
  description: thisarticle.m_desc,
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  keywords:thisarticle.keywords,
  author: "Satyam Ghimire",
  openGraph: {
    siteName:"sitename",
      title: thisarticle.m_title,
      description: thisarticle.m_desc,
      type: "article",
      url: thisarticle.slug,
      publishedTime: thisarticle.pdate,
      modifiedTime:thisarticle.mdate,
      images:{ 
          url: thisarticle.photo,
          width: 720,
          height: 480,
          alt: thisarticle.alt},
  },
  twitter: {
      title: thisarticle.m_title,
      description: thisarticle.m_desc,
      site: '@something',
      card: 'summary_large_image',  
      images:{ 
          url: thisarticle.photo,
          width: 720,
          height: 480,
          alt: thisarticle.alt},
  },
};
export default function page(){
  
    return(
      <>
        <div className="art-page">
              <div className="content">
               {thiscontent}
               </div>
      </div>  
      </>
    )
}