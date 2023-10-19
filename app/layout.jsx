import "@/styles/globals.css";
import ThemeRegistry from "./ThemeRegistry";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Promtopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <ThemeRegistry options={{ key: "mui" }}>
              <Nav />
              {children}
            </ThemeRegistry>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
