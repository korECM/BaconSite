import React, { Component } from 'react';
// import { withRouter, RouteComponentProps, Route, Link } from 'react-router-dom';
// import YesNoPage from './YesNoPage';
// import './css/Game.scss';
// import { throws } from 'assert';
// import wondering_cat from './wondering_cat.png';

// const base = [
//   {
//     id: 1,
//     name: '매운 거 좋아',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 2,
//     name: '매운 거 싫어',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 3,
//     name: 'FLEX 가능!',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 4,
//     name: 'FLEX 불가능ㅠ',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 5,
//     name: '정문 근처',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 6,
//     name: '후문 근처',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 7,
//     name: '혼밥',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 8,
//     name: '혼밥 아님',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 9,
//     name: '친구와 함께',
//     img: "wondering_cat.png",
//   },
//   {
//     id: 10,
//     name: '연인과 함께',
//     img: "wondering_cat.png",
//   },
// ];

// // dataset array shuffle randomly
// base.sort(() => Math.random() - Math.random());
// console.log(base);

// interface Props extends RouteComponentProps {}

// interface DataInterface {
//   option: string[];
// }

// interface State {
//   views: object[];
//   result: string[];
//   round: number;
//   sequence: number;
//   end: boolean;
// }

// class YesNo extends React.Component<Props, State> {
//   state: State = {
//     views: [base[0], base[1]],
//     result: [],
//     round: 10,
//     sequence: 0,
//     end: false,
//   };

//   handleReset() {
//     base.sort(() => Math.random() - Math.random());
//     this.setState({
//       views: [base[0], base[1]],
//       result: [],
//       round: 10,
//       sequence: 0,
//       end: false,
//     });
//   }

//   count = 0;
//   async handleChange(id: number) {
//     this.count++;
//     const resultdata = this.state.result.slice();
//     resultdata.push(base.find((item) => item.id === id));

//     this.setState((prevState) => ({
//       sequence: prevState.sequence + 1, // sequence 1씩 증
//       views: [base[2 * this.count], base[2 * this.count + 1]],
//     }));
//   }

//   render() {
//     const { views, end, round, sequence } = this.state;
//     const path = './';
//     console.log(this.state);
//     return (
//       <div className="yesno">
//         {views.map((view, index) => {
//           return <YesNoPage key={index} id={view.id} name={view.name} img={view.img} onChange={(id) => this.handleChange(id)} />;
//         })}
//       </div>
//     );
//   }
// }

// export default YesNo;
