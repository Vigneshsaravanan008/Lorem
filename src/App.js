import './App.css';
import { LoremIpsum } from "lorem-ipsum";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, Stack, Image } from 'react-bootstrap';
import image from "./assets/Images/nexevo.svg";
import { useState } from 'react';
import { getWikiepedia,getWikiContent } from "./Api/Api";

function App() {
  const [content, setContent] = useState("");
  const [wikipedia, setWikipedia] = useState("");
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  const getContent = () => {
    setContent(lorem.generateSentences(5));
  }

  const getWikipedia = async () => {
    const wikipediaResponse = await getWikiepedia();
    const pages = wikipediaResponse.query.pages;
    for (const pageId in pages) {
      const contentResponse = await getWikiContent(pageId);
      const pagesData=contentResponse.query.pages;
      for(const data in pagesData){
        if(pagesData.hasOwnProperty(data))
        {
          setContent(pagesData[data].extract);
        }
      }
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <Container>
          <Image src={image} className="p-3" alt="nexevo-web-design-company-in-bangalore" fluid />
          <Row>
            <Stack direction="horizontal" className="d-flex justify-content-center" gap={3}>
              <Button className="btn btn-secondary" onClick={() => getContent()}>Lorem Ipsum</Button>
              <Button className="btn btn-info" onClick={() => getWikipedia()}>Wikiepedia</Button>
              <Button className="btn btn-light">Random</Button>
            </Stack>
            {content &&
              <Card className="my-3">
                <Card.Body>{content}</Card.Body>
              </Card>
            }
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
