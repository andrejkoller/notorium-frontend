import { Input, InputGroup, Link } from "@chakra-ui/react";
import { Search } from "lucide-react";

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">
            <Link href="/" className="header-link">
              <h1 className="header-link-text">Notorium</h1>
            </Link>
          </div>
          <div className="header-searchbar">
            <InputGroup flex={1} endElement={<Search />}>
              <Input placeholder="Search for sheet music" />
            </InputGroup>
          </div>
          <div className="header-nav">
            <ul>
              <li>
                <Link href="/scores" className="header-link">
                  <span className="header-link-text">Scores</span>
                </Link>
              </li>
              <li>
                <Link href="/songbooks" className="header-link">
                  <span className="header-link-text">Songbooks</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-right">
          <ul>
            <li>
              <Link href="/upload" className="header-link">
                <span className="header-link-text">Upload</span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="header-link">
                <span className="header-link-text">Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
