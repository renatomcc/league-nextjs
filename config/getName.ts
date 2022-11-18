export default function getNewName(name: string): string {
  let newName = name
    .replaceAll(" ", "")
    .replaceAll("'", "")
    .replaceAll("-", "")
    .replaceAll(".", "");

  if (newName.includes("illump")) newName = "Nunu";
  if (newName.includes("Renata")) newName = "Renata";
  if (newName.includes("Wukong")) newName = "MonkeyKing";

  if (
    newName.includes("BelVeth") ||
    newName.includes("ChoGath") ||
    newName.includes("KaiSa") ||
    newName.includes("KhaZix") ||
    newName.includes("LeBlanc") ||
    newName.includes("VelKoz")
  )
    newName = newName[0] + newName.slice(1).toLowerCase();
  return newName;
}
