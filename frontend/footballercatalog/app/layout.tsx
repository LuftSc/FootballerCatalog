import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Menu from "antd/es/menu/menu";
import Link from "next/link";
import "./globals.css";

const items = [
  { key: "home", label: <Link href={"/"}>Home</Link> },
  { key: "footballers", label: <Link href={"/footballers"}>Footballers</Link> }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={{minHeight:"100vh"}}>
          <Header>
              <Menu 
                theme="dark" 
                mode="horizontal" 
                items={items} 
                style={{flex: 1, minWidth: 0}}
              />
          </Header>
          <Content style={{padding: "0 48px"}}>{children}</Content>
        </Layout>
        <Footer style={{textAlign: "center"}}>
          Footballer Catalog 2024 created by Artem Berdyshev
        </Footer>
      </body>
    </html>
  );
}
