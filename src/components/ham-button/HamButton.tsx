import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';

const HamButton = () => {
  const showMenu = () => {};

  return (
    <>
      <i className="g-ham-button" onClick={showMenu} aria-label="menu"></i>
      <div className="g-ham-container">
        <Link to="/gallery" className="header-link">
          MINNIE's GALLERY
        </Link>
        <Link to="/home" className="header-link">
          HOME
        </Link>
      </div>
    </>
  );
};

export default HamButton;

// const HamWrapper = styled.div`
// .header-links > * {
//         margin-left: 1rem;
//         letter-spacing: 0.07rem;
//       }

//       .header-links > *:hover {
//         color: white;
//       }

//       .header-ham-button {
//         opacity: 0;
//         visibility: hidden;
//         position: absolute;
//         top: 50%;
//         right: 0;
//         transform: translateY(-50%);
//         display: block;
//         width: 1.5625rem;
//         height: 1.5625rem;
//         border: 0.08rem solid rgb(102, 102, 102);
//         border-radius: 0.175rem;
//         background-color: transparent;
//         cursor: pointer;

//         &:after {
//           content: "";
//           position: absolute;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 60%;
//           height: 100%;
//           background: repeating-linear-gradient(
//             transparent 0,
//             transparent 20%,
//             rgb(142, 142, 142) 22%,
//             rgb(142, 142, 142) 28%,
//             transparent 30%,
//             transparent 45%,
//             rgb(142, 142, 142) 47%,
//             rgb(142, 142, 142) 53%,
//             transparent 55%,
//             transparent 70%,
//             rgb(142, 142, 142) 72%,
//             rgb(142, 142, 142) 78%,
//             transparent 80%,
//             transparent 100%
//           );
//         }
//       }

//       @media screen and (max-width: 768px) {
//         .header-links {
//           display: flex;
//           position: absolute;
//           top: calc(2rem + 1.5625rem / 2);
//           right: 0%;
//           line-height: 3.15;
//           text-align: right;
//           flex-flow: column;
//           justify-content: flex-start;
//         }

//         .header-links {
//           opacity: 0;
//           visibility: hidden;
//         }

//         .header-ham-button {
//           opacity: 1;
//           visibility: visible;
//         }

//         .header-ham-button:hover ~ .header-links,
//         .header-links:hover {
//           opacity: 1;
//           visibility: visible;
//           border-top: none;
//           border-right: none;
//           border-radius: 2px;
//         }
//       }
//     }
// `;
