import logo from "../logo.svg";
import "../App.css";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft,
} from "../utility";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import TotalPrice from "../components/TotalPrice";
import React, { Component } from "react";

export const categories = {
  1: {
    id: "1",
    name: "Travel",
    type: "outcome",
    iconName: "ios-plane",
  },
  2: {
    id: "2",
    name: "Financial",
    type: "income",
    iconName: "logo-plane",
  },
};
export const items = [
  {
    id: 1,
    title: "Travel",
    price: 200,
    date: "2021-11-10",
    cid: 1,
  },
  {
    id: 2,
    title: "Travel",
    price: 300,
    date: "2021-12-12",
    cid: 1,
  },
  {
    id: 3,
    title: "Financial",
    price: 3000,
    date: "2021-11-15",
    cid: 2,
  },
];

const newItem = {
  id: 4,
  title: "New Item",
  price: 2000,
  date: "2021-12-20",
  cid: 1,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW,
    };
  }

  changeView = (view) => {
    this.setState({
      tabView: view,
    });
  };
  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month },
    });
  };
  modifyItem = (modifiedItem) => {
    const modifiedItems = this.state.items.map((item) => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: "Updated title" };
      } else {
        return item;
      }
    });
    this.setState({
      items: modifiedItems,
    });
  };
  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items],
    });
  };
  deleteItem = (deletedItem) => {
    const filteredItems = this.state.items.filter(
      (item) => item.id !== deletedItem.id
    );
    this.setState({
      items: filteredItems,
    });
  };
  render() {
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items
      .map((item) => {
        item.category = categories[item.cid];
        return item;
      })
      .filter((item) => {
        return item.date.includes(
          `${currentDate.year}-${padLeft(currentDate.month)}`
        );
      });
    let totalIncome = 0,
      totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });

    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5">
            <img src={logo} className="App-logo" alt="logo" />
          </div>

          <div className="row">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>

        <div className="content-area py-3 px-3">
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && <h1>Chart View</h1>}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
