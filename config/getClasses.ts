export function getClasses(props: string): string {
  var classImage: string = "";
  switch (props) {
    case "Assassin":
      classImage = "https://i.ibb.co/KDynnRV/Assassin.png";
      break;
    case "Fighter":
      classImage = "https://i.ibb.co/8YxB85L/Fighter.png";
      break;
    case "Mage":
      classImage = "https://i.ibb.co/FzLYXcx/Mage.png";
      break;
    case "Marksman":
      classImage = "https://i.ibb.co/m9TGpqb/Marksman.png";
      break;
    case "Support":
      classImage = "https://i.ibb.co/BLCJJjV/Support.png";
      break;
    case "Tank":
      classImage = "https://i.ibb.co/GvySsqx/Tank.png";
      break;
  }
  return classImage;
}
