import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailWrapper, Button, Info } from "../components/StyledElements";

const Recipe = () => {
  // the details variable will be used in the return statement later down the code
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const itemsInLocalStorage = localStorage.getItem("details");
  // this is called bby the useEffect when the component mounts
  // the goal of this function is to make sure that the result of the api call
  // is stored in the state using setDetails and that the localStorage
  const fetchDetails = async () => {
    if (itemsInLocalStorage === undefined) {
      setDetails(JSON.parse(itemsInLocalStorage));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=f0836a79e66842a99544b60991bce5cd`
      );
      const detailData = await data.json();
      setDetails(detailData);
      localStorage.setItem("details", JSON.stringify(detailData));
      console.log(detailData);
    }
  };

  const displayActiveTab = (activeTab, details) => {
    if (activeTab === "instructions") {
      return (
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
        </div>
      );
    } else if (activeTab === "ingredients") {
      console.log(details.extendedIngredients);
      return (
        <ul>
          {details.extendedIngredients.map((ingredient) => {
            <li key={ingredient.id}>{ingredient.original}</li>;
          })}
        </ul>
      );
    } else {
      return <p></p>;
    }
  };
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>

        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {displayActiveTab(activeTab, details)}
      </Info>
    </DetailWrapper>
  );
};

export default Recipe;

/* <div>
<h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
<h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
</div> 
to add html data from an api into react
*/
