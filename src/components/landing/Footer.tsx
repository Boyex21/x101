import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t py-6 px-4 text-center">
      <p className="text-xs text-muted-foreground/50">
        © {new Date().getFullYear()} X101 — Todos los derechos reservados
        <span className="mx-2">·</span>
        <Link
          to="/admin/login"
          className="text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
        >
          ⚙
        </Link>
      </p>
    </footer>
  );
};

export default Footer;