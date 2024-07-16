// import React from "react";
// // import ReactDOM from "react-dom/client";
// import { Highlight, themes } from "prism-react-renderer";
// // import styles from 'styles.module.css'

// // const codeBlock = `
// // const GroceryItem: React.FC<GroceryItemProps> = ({ item }) => {
// //   return (
// //     <div>
// //       <h2>{item.name}</h2>
// //       <p>Price: {item.price}</p>
// //       <p>Quantity: {item.quantity}</p>
// //     </div>
// //   );
// // }
// // `;

// interface propsType {
//   code: string;
// }

// const PrismCode: React.FC<propsType> = (props) => {
//   const { code } = props;
//   return (
//     <Highlight theme={themes.shadesOfPurple} code={code} language="tsx">
//       {({ className, style, tokens, getLineProps, getTokenProps }) => (
//         <pre style={style}>
//           {tokens.map((line, i) => (
//             <div key={i} {...getLineProps({ line })}>
//               <span>{i + 1}</span>
//               {line.map((token, key) => (
//                 <span key={key} {...getTokenProps({ token })} />
//               ))}
//             </div>
//           ))}
//         </pre>
//       )}
//     </Highlight>
//   );
// };

// export default PrismCode;
