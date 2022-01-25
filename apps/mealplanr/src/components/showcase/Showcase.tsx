import Container from "../container/Container";
import SelectionArea, { Guide, Item, Listing, Quantaty, Step, Tag } from "../selectionArea/SelectionArea";
import "./Showcase.scss";

export default function Showcase () {
  return (
    <Container id="showcase">
      <h1>Recipe showcase</h1>
      <div className="button">Edit</div>
      <SelectionArea columns={2} cln={"trailer"}>
        <div>
          <h2>Title</h2>
          <div>
            <span className={"estimatedtime"}>Time</span>
            <div className={"tags list"}>
              <Tag type={"none"} name={"Main course"}/>
              <Tag type={"none"} name={"Launch"}/>

            </div>
            </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda odio blanditiis, fugit recusandae itaque quis aut iusto eos id optio eligendi quas ad, magni dolorem dolore numquam? Animi, dolore in?</p>
          <div>Rating</div>
        </div>
        <div>
          <div className={"image"}></div>
        </div>
      </SelectionArea>
      <SelectionArea columns={2} cln={"guide"}>
        <div>
          <p>Ingredients</p>
          <Quantaty />
          <Listing drag={false} name={"Main course"}>
            <Item name={"Carrot"} />
            <Item name={"Carrot"} />
          </Listing>
          <Listing drag={false} name={"Dessert"}>
            <Item name={"Carrot"} />
            <Item name={"Carrot"} />
          </Listing>
        </div>
        <div>
          <Guide title={"Pointless"}>
            <Step decs={"Do one thing"} />
            <Step decs={"Chop something - not your fingers!"} />
            <Step decs={"Do one thing once again"} />
            <Step decs={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."} />
          </Guide>
        </div>
      </SelectionArea>
    </Container>
  );
}