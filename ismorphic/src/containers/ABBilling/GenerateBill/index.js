import React, { Component } from 'react';
import { Col, Row, Icon, Table } from 'antd';
import moment from 'moment';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Input, {
  InputSearch,
  InputGroup,
  Textarea,
} from '../../../components/uielements/input';
import InputNumber from '../../../components/uielements/InputNumber';
import Select, { SelectOption } from '../../../components/uielements/select';
// import DatePicker from '../../../components/uielements/datePicker';
import AutoComplete from '../../../components/uielements/autocomplete';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import IntlMessages from '../../../components/utility/intlMessages';
import { rtl } from '../../../config/withDirection';

import TableWrapper from './antTable.style';

import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

const Option = SelectOption;
const dateFormat = 'YYYY-MM-DD';

export default class InputField extends Component {

  constructor(props) {
      super(props);
      this.state = {
          bill_detail: {
              bill_date: "",
              company_name:[],
              truck_number:[],
              package_size:[],
              city_from:[],
              city_to:[],
              order_type:[],
              date_from: "",
              date_to: ""
          },
          order_detail: {
              order_date: "",
              company_name:"",
              truck_number:"",
              package_size:"",
              city_from:"",
              city_to:"",
              order_type:"",
              container_number:"",
              lr_number:"",
              freight: 0,
              overload: 0,
              liftoff: 0,
              advanced: 0,
              diesel: 0,
              balance: 0,
              tds: 0,
              party_gst: "",
          },
          nill_data: {
              company_name:"",
              truck_number:"",
              package_size:"",
              city_from:"",
              city_to:"",
              order_type:"",
          },
          order_list: [],
          CustomerCompanyDetail:[],
          TruckDetail:[],
          CityDetail:[],
          PackageDetail:[],
          OrderType:[],
          total_amount: 0,
          total_liftoff: 0,
          total_advanced: 0,
          total_net_amount: 0,
          total_freight: 0,
          total_count: 0,
      }


      this.AddNewOrder = this.AddNewOrder.bind(this)
      this.handleChangeInputValue_order_detail = this.handleChangeInputValue_order_detail.bind(this)
      this.handleChangeInputValue = this.handleChangeInputValue.bind(this)
      this.handleChangeDateValue = this.handleChangeDateValue.bind(this)

      this.handle_change_company_name = this.handle_change_company_name.bind(this)
      this.handle_change_truck_number = this.handle_change_truck_number.bind(this)
      this.handle_change_package_size = this.handle_change_package_size.bind(this)
      this.handle_change_city_from = this.handle_change_city_from.bind(this)
      this.handle_change_city_to = this.handle_change_city_to.bind(this)
      this.handle_change_order_type = this.handle_change_order_type.bind(this)

      this.fetchAllDetails = this.fetchAllDetails.bind(this)

      this.getCookie = this.getCookie.bind(this)
      this.getFormatedDate = this.getFormatedDate.bind(this)

      this.handleChangeInputValue_calculation = this.handleChangeInputValue_calculation.bind(this)
      this.handleChangeRangeDate = this.handleChangeRangeDate.bind(this)
      this.get_delayed_date_object = this.get_delayed_date_object.bind(this)

      this.handleChangeCompany = this.handleChangeCompany.bind(this)
      this.handleChangeTruck = this.handleChangeTruck.bind(this)
      this.handleChangePackage = this.handleChangePackage.bind(this)
      this.handleChangeCityFrom = this.handleChangeCityFrom.bind(this)
      this.handleChangeCityTo = this.handleChangeCityTo.bind(this)
      this.handleChangeOrderType = this.handleChangeOrderType.bind(this)

      this.filter_orders = this.filter_orders.bind(this)
      this.generate_bill = this.generate_bill.bind(this)
      this.delete_order = this.delete_order.bind(this)
      this.filter_orders_aa = this.filter_orders_aa.bind(this)
      this.handleChangeInputValue_gst = this.handleChangeInputValue_gst.bind(this)

  };

  componentWillMount() {
      this.fetchAllDetails()
  }

  fetchAllDetails(){

      // CustomerCompanyDetail

      fetch('http://127.0.0.1:8000/api/customercompanydetail/')
        .then(response => response.json())
          .then(data => {
            this.setState({CustomerCompanyDetail: data});
            for(var index=0 ; index<data.length ; index++){
              if(data[index].company_name == "nill"){
                  this.setState({
                    order_detail : {
                      ...this.state.order_detail,
                      company_name: data[index].url
                    },
                    nill_data : {
                      ...this.state.nill_data,
                      company_name: data[index].url
                    }
                  });
              }
            }
          }
        )

      // TruckDetail
      fetch('http://127.0.0.1:8000/api/truckdetail/')
        .then(response => response.json())
          .then(data => {
            this.setState({TruckDetail: data})

            for(var index=0 ; index<data.length ; index++){
              if(data[index].truck_number == "nill"){
                  this.setState({
                    order_detail : {
                      ...this.state.order_detail,
                      truck_number: data[index].url
                    },
                    nill_data : {
                      ...this.state.nill_data,
                      truck_number: data[index].url
                    }
                  });
              }
            }

          })


      fetch('http://127.0.0.1:8000/api/citydetail/')
        .then(response => response.json())
        .then(data => {
            this.setState({CityDetail: data});

            for(var index=0 ; index<data.length ; index++){
              if(data[index].city_name == "nill"){
                  this.setState({
                    order_detail : {
                      ...this.state.order_detail,
                      city_from: data[index].url,
                      city_to: data[index].url
                    },
                    nill_data : {
                      ...this.state.nill_data,
                      city_from: data[index].url,
                      city_to: data[index].url
                    }
                  });
              }
            }

          })


      fetch('http://127.0.0.1:8000/api/packagedetail/')
        .then(response => response.json())
        .then(data => {
            this.setState({PackageDetail: data});

            for(var index=0 ; index<data.length ; index++){
              if(data[index].package_size == "40"){
                  this.setState({
                    order_detail : {
                      ...this.state.order_detail,
                      package_size: data[index].url
                    },
                    nill_data : {
                      ...this.state.nill_data,
                      package_size: data[index].url
                    }
                  });
              }
            }

        })
      fetch('http://127.0.0.1:8000/api/ordertype/')
        .then(response => response.json())
        .then(data => {
            this.setState({OrderType: data});

            for(var index=0 ; index<data.length ; index++){
              if(data[index].order_type == "nill"){
                  this.setState({
                    order_detail : {
                      ...this.state.order_detail,
                      order_type: data[index].url
                    },
                    nill_data : {
                      ...this.state.nill_data,
                      order_type: data[index].url
                    }
                  });
              }
            }

          })

      var today = new Date();
      today = this.getFormatedDate(today)

      var delayed_date = this.get_delayed_date_object(7)
      delayed_date = this.getFormatedDate(delayed_date)

      this.setState({
        bill_detail : {
          ...this.state.order_detail,
          bill_date: today,
          date_to: today,
          date_from: delayed_date
        }
      });

  }

  get_delayed_date_object(delay_period) {
      var date_obj = new Date();
      date_obj.setDate(date_obj.getDate() - delay_period)
      return date_obj
  }

  getFormatedDate(date_obj){
    var dd = date_obj.getDate();
    var mm = date_obj.getMonth()+1;
    var yyyy = date_obj.getFullYear();

    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }
    return yyyy+'-'+mm+'-'+dd;
  }

  getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  AddNewOrder(e){

      console.log(this.state)
      e.preventDefault();

      var csrftoken = this.getCookie('csrftoken')
      var url = `http://127.0.0.1:8000/api/add-new-order/`;

      var data = this.state.order_detail;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(data)
      }).then((response) => {
          console.log(response)
          console.log('Successfully Order Created')
      }).catch(function(error) {
          console.log('ERROR:', error)
      })
  }

  filter_orders(e){

      console.log(this.state)
      e.preventDefault();

      var csrftoken = this.getCookie('csrftoken')
      var url = `http://127.0.0.1:8000/api/filter-order/`;

      var data = this.state.bill_detail;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        this.setState({
          order_list: data.order_list,
          total_amount: data.total_amount,
          total_liftoff: data.total_liftoff,
          total_advanced: data.total_advanced,
          total_net_amount: data.total_net_amount,
          total_freight: data.total_freight,
          total_count: data.total_count,
        })
      }).catch(function(error) {
        console.log('ERROR:', error)
      })

  }

  filter_orders_aa(){

      var csrftoken = this.getCookie('csrftoken')
      var url = `http://127.0.0.1:8000/api/filter-order/`;

      var data = this.state.bill_detail;

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        this.setState({
          order_list: data.order_list,
          total_amount: data.total_amount,
          total_liftoff: data.total_liftoff,
          total_advanced: data.total_advanced,
          total_net_amount: data.total_net_amount,
          total_freight: data.total_freight,
          total_count: data.total_count,
        })
      }).catch(function(error) {
        console.log('ERROR:', error)
      })
  }

  generate_bill(e){
    e.preventDefault();

    var csrftoken = this.getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/generate-bill/`;

    var data = this.state.bill_detail;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      document.location.href = data["link"]
    }).catch(function(error) {
      console.log('ERROR:', error)
    })
  }

  delete_order(e, object){
    e.preventDefault();

    var csrftoken = this.getCookie('csrftoken')
    var url = "http://127.0.0.1:8000/api/billdetail/" + object.id + "/";

    var data = this.state.bill_detail;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data)
    }).then(response => { response.json(); this.filter_orders_aa(); })
    .catch(error => {
      console.log('ERROR:', error)
    })
  }

  handleChangeInputValue(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  handleChangeDateValue(dateObj) {
    var selected_date = dateObj.format("YYYY-MM-DD");

    this.setState({
      bill_detail: {
        ...this.state.bill_detail,
        bill_date: selected_date
      }
    })
  }

  handleChangeRangeDate(dateObjArray) {
    var date_from = dateObjArray[0].format("YYYY-MM-DD");
    var date_to = dateObjArray[1].format("YYYY-MM-DD");

    this.setState({
      bill_detail: {
        ...this.state.bill_detail,
        date_from: date_from,
        date_to: date_to
      }
    })
  }

  handleChangeInputValue_order_detail(evt) {
    const value = evt.target.value;
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        [evt.target.name]: value
      }
    });
  }

  handle_change_company_name(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        company_name: value
      }
    });
  }

  handle_change_truck_number(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        truck_number: value
      }
    });
  }

  handle_change_package_size(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        package_size: value
      }
    });
  }

  handle_change_city_from(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        city_from: value
      }
    });
  }

  handle_change_city_to(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        city_to: value
      }
    });
  }

  handle_change_order_type(value) {
    this.setState({
      order_detail : {
        ...this.state.order_detail,
        order_type: value
      }
    });
  }

  handleChangeCompany(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          company_name: value
        }
      })
  }

  handleChangeTruck(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          truck_number: value
        }
      })
  }

  handleChangePackage(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          package_size: value
        }
      })
  }

  handleChangeCityFrom(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          city_from: value
        }
      })
  }

  handleChangeCityTo(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          city_to: value
        }
      })
  }

  handleChangeOrderType(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          order_type: value
        }
      })
  }

  handleChangeGSTNumber(value){
      this.setState({
        bill_detail : {
          ...this.state.bill_detail,
          gst_number: value
        }
      })
  }

  handleChangeInputValue_gst(evt) {
      var value = evt.target.value;

      this.setState({
          bill_detail: {
              ...this.state.bill_detail,
              [evt.target.name]: value
          }
      });
  }


  // caculation

  handleChangeInputValue_calculation(evt){
    var value = evt.target.value;

    if(value == ""){
      value = 0;
    }

    // balance = freight + overload + liftoff - advanced - diesel

    value = parseInt(value);
    evt.target.value = value;

    var old_value = parseInt(this.state.order_detail[evt.target.name]);

    var balance_old = parseInt(this.state.order_detail.balance);
    var balance_new = 0;

    if(evt.target.name == "advanced" || evt.target.name == "diesel" || evt.target.name == "tds"){
      balance_new = balance_old - ( value - old_value );
    }else{
      balance_new = balance_old + ( value - old_value );
    }

    this.setState({
      order_detail : {
        ...this.state.order_detail,
        [evt.target.name] : value,
        balance : balance_new
      }
    });
  }

  render() {
    const rowStyle = {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
    };
    const colStyle = {
      marginBottom: '16px',
    };
    const gutter = 16;
    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };
    const button_width = {
      width: '150px',
      right: 0
    };


    const columns = [
      { title: 'Date', dataIndex: 'order_date', key: 'order_date' },
      { title: 'Party', dataIndex: 'company_name', key: 'company_name' },
      { title: 'Truck', dataIndex: 'truck_number', key: 'truck_number' },
      { title: 'From', dataIndex: 'city_from', key: 'city_from' },
      { title: 'To', dataIndex: 'city_to', key: 'city_to' },
      { title: 'Balance', dataIndex: 'balance', key: 'balance' },
      { title: 'Action', key: 'id', render: (text, record) => (
              <a id={record.id} onClick={(e) => this.delete_order(e, record) }>Delete</a>
          ),
      }
    ];

    const data = this.state.order_list;

    console.log(data)

    return (
      <LayoutWrapper>



        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box
              title="Apply Filter"
              subtitle=""
            >
              <ContentHolder>

              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Date </span>
                      </Col>
                      <DatePicker style={{ width: 300 }}
                      onChange={this.handleChangeDateValue}
                      defaultValue={moment(this.state.bill_detail.bill_date, dateFormat)}
                      />
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Party </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangeCompany}
                      >
                        {
                            this.state.CustomerCompanyDetail.map(function(value, index){
                                return <Option value={value.url} >{value.company_name}</Option>;
                            })
                        }
                      </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Truck </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangeTruck}
                      >
                        {
                            this.state.TruckDetail.map(function(value, index){
                                return <Option value={value.url} >{value.truck_number}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Pkg </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangePackage}
                      >
                        {
                            this.state.PackageDetail.map(function(value, index){
                                return <Option value={value.url} >{value.package_size}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> From </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangeCityFrom}
                      >
                        {
                            this.state.CityDetail.map(function(value, index){
                                return <Option value={value.url} >{value.city_name}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> To </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangeCityTo}
                      >
                        {
                            this.state.CityDetail.map(function(value, index){
                                return <Option value={value.url} >{value.city_name}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Type </span>
                      </Col>
                      <Select
                        mode="multiple"
                        style={{ width: '80%' }}
                        placeholder="Please select"
                        defaultValue={[]}
                        onChange={this.handleChangeOrderType}
                      >
                        {
                            this.state.OrderType.map(function(value, index){
                                return <Option value={value.url} >{value.order_type}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Party GST </span>
                      </Col>
                      <Col span="16">
                        <Input defaultValue=""  type="text" style={{ width: 300 }} name="party_gst" onChange={this.handleChangeInputValue_gst}/>
                      </Col>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Date From - Date To </span>
                      </Col>
                      <Col span="16">
                        <RangePicker
                          defaultValue={[
                            moment(this.state.bill_detail.date_from, dateFormat)
                            , moment(this.state.bill_detail.date_to, dateFormat)
                            ]}
                          format={dateFormat}
                          onChange={this.handleChangeRangeDate}
                        />
                      </Col>
                    </InputGroup>

                   <Button type="primary" style={margin, button_width} onClick={this.filter_orders}>
                      {"Apply Filter"}
                    </Button>
                    <Button type="sucess" style={margin, button_width} onClick={this.generate_bill}>
                      {"Print Bill"}
                    </Button>

                </Col>
              </Row>




              </ContentHolder>
            </Box>
          </Col>
        </Row>




        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box
              title="Filtered Orders"
              subtitle=""
            >
              <ContentHolder>


              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Entry </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_count}  </span>
                </Col>
              </div>

              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Freight </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_freight}  </span>
                </Col>
              </div>

              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Advanced </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_advanced}  </span>
                </Col>
              </div>

              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Amount </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_amount}  </span>
                </Col>
              </div>

              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Liftoff </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_liftoff}  </span>
                </Col>
              </div>

              <div>
                <Col span="1">
                  <span> </span>
                </Col>
                <Col span="3">
                  <span> Total Net Amount </span>
                </Col>
                <Col span="8">
                  <span>  {this.state.total_net_amount}  </span>
                </Col>
              </div>


              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={24} sm={24} xs={24} style={colStyle}>
                  <Box>
                    <ContentHolder>

                    <Table
                      columns={columns}
                      expandedRowRender={
                        record =>

                              <div>

                                  <Row style={rowStyle} gutter={gutter} justify="start">
                                    <Col md={12} sm={12} xs={24} style={colStyle}>

                                      <div>
                                        <Col span="6">
                                          <span> Package </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.package_size}  </span>
                                        </Col>
                                      </div>

                                      <div>
                                        <Col span="6">
                                          <span> Container </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.container_number}
                                            {record.container_number == "" && " -- "}
                                           </span>
                                        </Col>
                                      </div>

                                      <div>
                                        <Col span="6">
                                          <span> LR </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.lr_number}
                                            {record.lr_number == "" && " -- "}
                                           </span>
                                        </Col>
                                      </div>

                                    </Col>
                                    <Col md={12} sm={12} xs={24} style={colStyle}>

                                      <div>
                                        <Col span="6">
                                          <span> Freight </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.freight}  </span>
                                        </Col>
                                      </div>

                                      <div>
                                        <Col span="6">
                                          <span> Advanced </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.advanced}  </span>
                                        </Col>
                                      </div>

                                      <div>
                                        <Col span="6">
                                          <span> Liftoff </span>
                                        </Col>
                                        <Col span="18">
                                          <span>  {record.liftoff}  </span>
                                        </Col>
                                      </div>


                                    </Col>
                                  </Row>


                              </div>
                            }
                            dataSource={this.state.order_list}
                          />


                    </ContentHolder>
                  </Box>
                </Col>
              </Row>

              </ContentHolder>
            </Box>
          </Col>
        </Row>

      </LayoutWrapper>
    );
  }
}






  // <div>
  //   <Col span="6">
  //     <span> Overload </span>
  //   </Col>
  //   <Col span="18">
  //     <span>  {record.overload}  </span>
  //   </Col>
  // </div>

  // <div>
  //   <Col span="6">
  //     <span> Diesel </span>
  //   </Col>
  //   <Col span="18">
  //     <span>  {record.diesel}  </span>
  //   </Col>
  // </div>

  // <div>
  //   <Col span="6">
  //     <span> Tds </span>
  //   </Col>
  //   <Col span="18">
  //     <span>  {record.tds}  </span>
  //   </Col>
  // </div>
