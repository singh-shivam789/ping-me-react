import UtilityIconsChatTop from "./UtilityIconsChatTop";
import UtilityIconsList from "./UtilityIconsList";
import UtilityIconsDetail from "./UtilityIconsDetail";
import UtilityIconsChatBottom from "./UtilityIconsChatBottom";

export default function UtilityIcons({ whichUserPage }) {
  switch (whichUserPage) {
    case "chatTop":
      return <UtilityIconsChatTop />;
    case "detail":
      return <UtilityIconsDetail />;
    case "chatBottom": 
      return <UtilityIconsChatBottom />;
    default:
      return <UtilityIconsList />;
  }
}