import Image from "next/image";
// Just a sample function to give idea of how to do it.
// This will not directly work with the watarrraywilllooklike.js but I hope this will give you the idea.
const renderContent = (array) => {
    const elements = [];
    for (let i = 1; i <= 150; i++) {
      const pi = array[`p${i}`];
      const phi = array[`ph${i}`];
      const pbi = array[`pb${i}`];
      const imgi = array[`img${i}`];
      const imgalti = array[`imgalt${i}`];
      const imgbyi = array[`imgby${i}`];
      const imgli = array[`imgl${i}`];
      const imgri = array[`imgr${i}`];

      if (pi) {
        elements.push(<p className="art-txt left" dangerouslySetInnerHTML={{ __html: pi }} key={`p-${i}`}></p>);
      }
      if (phi) {
        elements.push(<p className="art-hlt left" dangerouslySetInnerHTML={{ __html: phi }} key={`ph-${i}`}></p>);
      }
      if (pbi) {
        elements.push(<p className="art-stle left" dangerouslySetInnerHTML={{ __html: pbi }} key={`pb-${i}`}></p>);
      }
      if (imgi && array[`imgalt${i + 1}`]) {
        if(array[`imgby${i + 2}`]){
            elements.push(
                <div key={`img-${i}`} className="" >
                  <Image className="wd-fix img" src={imgi} alt={array[`imgalt${i + 1}`]} width={850} height={600}/>
                  <p  key={`imgby-${i+2}`} className="auth-date" dangerouslySetInnerHTML={{ __html: array[`imgby${i + 2}`] }} ></p>
                </div>
              );
        }
        else {elements.push(
          <div key={`img-${i}`} className="" >
            <Image src={imgi} className="wd-fix img" alt={array[`imgalt${i + 1}`]} width={850} height={600}/>
          </div>
        );
      }
    }
      if (imgli && array[`imgalt${i + 1}`]) {
        if(array[`imgby${i + 2}`]){
            elements.push(
                <div key={`imgl-${i}`} className="fl-left" >
                  <Image className="img" src={imgli} alt={array[`imgalt${i + 1}`]} width={150} height={250}/>
                  <p  key={`imgby-${i+2}`} className="auth-date" dangerouslySetInnerHTML={{ __html: array[`imgby${i + 2}`] }} ></p>
                </div>
              );
        }
        else elements.push(
          <div key={`imgl-${i}`} className="fl-left" >
            <Image src={imgli} className="img" alt={array[`imgalt${i + 1}`]} width={150} height={250}/>
          </div>
        );
      }
      if (imgri && array[`imgalt${i + 1}`]) {
        if(array[`imgby${i + 2}`]){
            elements.push(
                <div key={`imgr-${i}`} className="fl-right" >
                  <Image className="img" src={imgri} alt={array[`imgalt${i + 1}`]} width={150} height={250}/>
                  <p  key={`imgby-${i+2}`} className="auth-date" dangerouslySetInnerHTML={{ __html: array[`imgby${i + 2}`] }} ></p>
                </div>
              );
        }
        else elements.push(
          <div key={`imgr-${i}`} className="fl-right" >
            <Image src={imgri} className="img" alt={array[`imgalt${i + 1}`]} width={150} height={250}/>
          </div>
        );
      }
      
    }
    return elements;
  };
export default renderContent;