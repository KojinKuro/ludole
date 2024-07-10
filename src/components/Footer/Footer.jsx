import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      Coded by <Link to="https://github.com/BrandonDoza">Brandon Doza</Link>,{" "}
      <Link to="https://github.com/KojinKuro">Charles Kwang</Link>,{" "}
      <Link to="https://github.com/moth-dust">Gwyneth Patrick</Link>,{" "}
      <Link to="https://github.com/LISims88">Lydia Sims</Link>
    </footer>
  );
}
