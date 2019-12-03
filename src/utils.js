import { abjectives, nouns } from "./words";

const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * abjectives.length);
  return `${abjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export default generateSecret;
