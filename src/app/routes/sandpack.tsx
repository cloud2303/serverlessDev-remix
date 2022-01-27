import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import styles from "@codesandbox/sandpack-react/dist/index.css";
import { ClientOnly } from "remix-utils";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export default function App() {
  let appCode = `import {interval,scan} from 'rxjs'
    import {useState,useEffect}from 'react'
    let time$ = interval(1000).pipe(scan((acc,cur)=>{
      return cur
    }))
    
    export default function App() {
      const [hello,setHello]=useState("")
      useEffect(()=>{
        let sub1 = time$.subscribe(setHello)
        return ()=>{
          console.log(1)
          sub1.unsubscribe()
        }
      },[])
      return <h1>计时器{hello}</h1>
    }`;
  const IndexCode = `import React, { StrictMode } from "react";
    import ReactDOM from "react-dom";
    import "./styles.css";
    import App from "./App";
    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <StrictMode>
        <App />
      </StrictMode>,
      rootElement
    );`;
  const styleCssCode = `body {
        font-family: sans-serif;
        -webkit-font-smoothing: auto;
        -moz-font-smoothing: auto;
        -moz-osx-font-smoothing: grayscale;
        font-smoothing: auto;
        text-rendering: optimizeLegibility;
        font-smooth: always;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }
      h1 {
        font-size: 1.5rem;
      }`;
  return (
    <ClientOnly>
      <Sandpack
        template="react"
        customSetup={{
          dependencies: {
            rxjs: "^7.5.2",
          },
        }}
        options={{
          showInlineErrors: true, // default - false
          wrapContent: true, // default - false
          editorHeight: 800, // default - 300
          editorWidthPercentage: 50, // default - 50
          bundlerURL:
            "https://codesandbox-1257325628.cos-website.ap-shanghai.myqcloud.com",
          showNavigator: true,
          closableTabs: true,
        }}
        files={{
          "/App.js": appCode,
          "/index.js": IndexCode,
          "/styles.css": styleCssCode,
        }}
      />
    </ClientOnly>
  );
}
