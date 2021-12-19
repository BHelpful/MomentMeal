import Container from "../container/Container";
import SelectionArea, { ButtonField, MultipleChoice, Search, TextField } from "../selectionArea/SelectionArea";
import "./Settings.scss";
import ThemePreview from "./ThemePreview";

const prevcolor = {
  base: Number(document.documentElement.style.getPropertyValue('--c')),
  shade: Number(document.documentElement.style.getPropertyValue('--e').replace(/%/, ""))
};

const setcolor = (obj: any) => {
  const {base, shade} = obj;
  document.documentElement.style.setProperty('--c', base.toString());
  document.documentElement.style.setProperty('--e', shade+"%");
};

const handleOpenTheme = () => {
  const elem = document.getElementById("ThemePreview");
  if(elem)
    if(elem.classList.contains("hidden"))
      elem.classList.remove("hidden");
    else elem.classList.add("hidden");
}

const handleChangeShade = () => {
  const thd = 75;
  prevcolor.shade = prevcolor.shade>=thd?prevcolor.shade-thd:prevcolor.shade+thd;
  setcolor(prevcolor);
}

// Function that creates the settings
export default function Settings() {
  return (
    <Container id={"settings"}>
      <h1>Personal information</h1>
      <div className={"button"}>Back</div>
      <SelectionArea columns={3}>
        <div>
          <TextField decription={"Email"} placeholder={"larsl@gmail.com"} />
          <TextField decription={"First name"} placeholder={"lars"} />
          <TextField decription={"Last name"} placeholder={"larsen"} />
        </div>
        <div>
          <ButtonField decription="Connect">
            <span><img src="https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_29.ico" alt="" />Google</span>
          </ButtonField>
        <ButtonField decription="Connect">
            <span><img src="https://www.outlook.com/favicon.ico" alt="" />Outlook</span>
          </ButtonField>
        <ButtonField decription="Connect">
            <span><img src="https://www.icloud.com/favicon.ico" alt="" />iCloud</span>
          </ButtonField>
        </div>
        <div>
          <div>
            <div className={"image"}></div>
          </div>
          <div className={"button"}>Change profile picture</div>
        </div>
        <div className={"infrequent"}>
          <ButtonField decription="Request data" vertical>
            <span>Account data</span>
          </ButtonField>
          <ButtonField decription="Change password" vertical danger>
            <span>Access</span>
          </ButtonField>
          <ButtonField decription="Delete my account" vertical danger>
            <span>Danger zone</span>
          </ButtonField>
        </div>
      </SelectionArea>
      <h1>Preferences</h1>
      <SelectionArea columns={3}>
        <div>
          <Search decription="Contry" type="" />
          <Search taglist decription="What stores do you prefer?" />
        </div>
        <div>
          <Search decription="Diet" type="dropdown" />
          <Search taglist decription="Allergies / intolerences" />
          <MultipleChoice decription="Hide recipes containing these"  name="itolalgi"/>
        </div>
        <div>
          <p>Notifications</p>
          <MultipleChoice decription="Email" name="email"/>
          <MultipleChoice decription="Web" name="web"/>
          <MultipleChoice decription="Mobile" name="mobile"/>
          <p>Theme</p>
          <div>
            <div className={"themeselect button"} onClick={handleOpenTheme}>Change Theme</div>
            <div className={"Shadeselect button"} onClick={handleChangeShade}></div>
            <ThemePreview />
          </div>
        </div>
      </SelectionArea>
    </Container>
  );
}