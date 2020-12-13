import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
import moment from 'moment';
import Button, { ButtonGroup } from '../../../components/uielements/button';
import Input, {
    InputSearch,
    InputGroup,
    Textarea,
} from '../../../components/uielements/input';
import InputNumber from '../../../components/uielements/InputNumber';
import Select, { SelectOption } from '../../../components/uielements/select';
import DatePicker from '../../../components/uielements/datePicker';
import AutoComplete from '../../../components/uielements/autocomplete';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import ContentHolder from '../../../components/utility/contentHolder';
import IntlMessages from '../../../components/utility/intlMessages';
import { rtl } from '../../../config/withDirection';

const Option = SelectOption;
const dateFormat = 'YYYY-MM-DD';

export default class InputField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order_detail: {
                order_date: "",
                company_name: "",
                truck_number: "",
                package_size: "",
                city_from: "",
                city_to: "",
                order_type: "",
                container_number: "",
                lr_number: "",
                freight: 0,
                overload: 0,
                liftoff: 0,
                advanced: 0,
                diesel: 0,
                balance: 0,
                tds: 0,
            },
            nill_data: {
                company_name: "",
                truck_number: "",
                package_size: "",
                city_from: "",
                city_to: "",
                order_type: "",
            },
            CustomerCompanyDetail: [],
            TruckDetail: [],
            CityDetail: [],
            PackageDetail: [],
            OrderType: [],
        }


        this.AddNewOrder = this.AddNewOrder.bind(this)
        this.TakeBackup = this.TakeBackup.bind(this)
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

        this.handleChangeInputValue_calculation = this.handleChangeInputValue_calculation.bind(this)
    };

    componentWillMount() {
        this.fetchAllDetails()
    }

    fetchAllDetails() {

        // CustomerCompanyDetail

        fetch('http://127.0.0.1:8000/api/customercompanydetail/')
            .then(response => response.json())
            .then(data => {
                this.setState({ CustomerCompanyDetail: data });
                for (var index = 0; index < data.length; index++) {
                    if (data[index].company_name == "nill") {
                        this.setState({
                            order_detail: {
                                ...this.state.order_detail,
                                company_name: data[index].url
                            },
                            nill_data: {
                                ...this.state.nill_data,
                                company_name: data[index].url
                            }
                        });
                    }
                }
            })

        // TruckDetail
        fetch('http://127.0.0.1:8000/api/truckdetail/')
            .then(response => response.json())
            .then(data => {
                this.setState({ TruckDetail: data })

                for (var index = 0; index < data.length; index++) {
                    if (data[index].truck_number == "nill") {
                        this.setState({
                            order_detail: {
                                ...this.state.order_detail,
                                truck_number: data[index].url
                            },
                            nill_data: {
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
                this.setState({ CityDetail: data });

                for (var index = 0; index < data.length; index++) {
                    if (data[index].city_name == "nill") {
                        this.setState({
                            order_detail: {
                                ...this.state.order_detail,
                                city_from: data[index].url,
                                city_to: data[index].url
                            },
                            nill_data: {
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
                this.setState({ PackageDetail: data });

                for (var index = 0; index < data.length; index++) {
                    if (data[index].package_size == "40") {
                        this.setState({
                            order_detail: {
                                ...this.state.order_detail,
                                package_size: data[index].url
                            },
                            nill_data: {
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
                this.setState({ OrderType: data });

                for (var index = 0; index < data.length; index++) {
                    if (data[index].order_type == "nill") {
                        this.setState({
                            order_detail: {
                                ...this.state.order_detail,
                                order_type: data[index].url
                            },
                            nill_data: {
                                ...this.state.nill_data,
                                order_type: data[index].url
                            }
                        });
                    }
                }

            })

        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;

        this.setState({
            order_detail: {
                ...this.state.order_detail,
                order_date: today
            }
        });

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

    AddNewOrder(e) {
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
            if(response['status'] == 201){
                console.log('Successfully Order Created')
                document.getElementById("submit_button").style.background = "green"
                document.getElementById("submit_button").childNodes[0].innerHTML = "Added"
                setTimeout( () => {
                    document.getElementById("submit_button").style.background = "blue"
                    document.getElementById("submit_button").childNodes[0].innerHTML = "Add Order"
                }, 1500)
            }else{
                document.getElementById("submit_button").style.background = "red"
                document.getElementById("submit_button").childNodes[0].innerHTML = "Fail"
                document.getElementById("submit_button").disabled = "true"
            }
        }).catch(function(error) {
            console.log('ERROR:', error)
            document.getElementById("submit_button").style.background = "red"
            document.getElementById("submit_button").childNodes[0].innerHTML = "Fail"
            document.getElementById("submit_button").disabled = "true"
        })
    }

    TakeBackup(){
        var csrftoken = this.getCookie('csrftoken')
        var url = `http://127.0.0.1:8000/api/take-backup/`;

        var data = {}

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if(response['status'] == 201){
                document.getElementById("backup_button").style.background = "orange"
                document.getElementById("backup_button").childNodes[0].innerHTML = "Done"
                setTimeout( () => {
                    document.getElementById("backup_button").style.background = "purple"
                    document.getElementById("backup_button").childNodes[0].innerHTML = "Take Order"
                }, 1500)
            }else{
                document.getElementById("backup_button").style.background = "red"
                document.getElementById("backup_button").childNodes[0].innerHTML = "Fail"
                document.getElementById("backup_button").disabled = "true"
            }
        }).catch(function(error) {
            document.getElementById("backup_button").style.background = "red"
            document.getElementById("backup_button").childNodes[0].innerHTML = "Fail"
            document.getElementById("backup_button").disabled = "true"
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
            order_detail: {
                ...this.state.order_detail,
                order_date: selected_date
            }
        })
    }

    handleChangeInputValue_order_detail(evt) {
        const value = evt.target.value;
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                [evt.target.name]: value
            }
        });
    }

    handle_change_company_name(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                company_name: value
            }
        });
    }

    handle_change_truck_number(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                truck_number: value
            }
        });
    }

    handle_change_package_size(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                package_size: value
            }
        });
    }

    handle_change_city_from(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                city_from: value
            }
        });
    }

    handle_change_city_to(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                city_to: value
            }
        });
    }

    handle_change_order_type(value) {
        this.setState({
            order_detail: {
                ...this.state.order_detail,
                order_type: value
            }
        });
    }

    // caculation

    handleChangeInputValue_calculation(evt) {
        var value = evt.target.value;

        if (value == "") {
            value = 0;
        }

        // balance = freight + overload + liftoff - advanced - diesel

        value = parseInt(value);
        evt.target.value = value;

        var old_value = parseInt(this.state.order_detail[evt.target.name]);

        var balance_old = parseInt(this.state.order_detail.balance);
        var balance_new = 0;

        if (evt.target.name == "advanced" || evt.target.name == "diesel" || evt.target.name == "tds") {
            balance_new = balance_old - (value - old_value);
        } else {
            balance_new = balance_old + (value - old_value);
        }

        this.setState({
            order_detail: {
                ...this.state.order_detail,
                [evt.target.name]: value,
                balance: balance_new
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

        return (
            <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box
              title="Create Order"
              subtitle=""
            >
              <ContentHolder>

              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Box>
                    <ContentHolder>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Party </span>
                      </Col>
                      <Select
                      showSearch
                      optionFilterProp="children"
                      defaultValue="nill"
                      style={{ width: '80%' }}
                      name="company_name"
                      onChange={this.handle_change_company_name}
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
                      showSearch
                      optionFilterProp="children"
                      defaultValue="nill"
                      style={{ width: '80%' }}
                      name="truck_number"
                      onChange={this.handle_change_truck_number}>
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
                      showSearch
                      optionFilterProp="children"
                      defaultValue="40"
                      style={{ width: '80%' }}
                      name="package_size"
                      onChange={this.handle_change_package_size}>
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
                      showSearch
                      optionFilterProp="children"
                      defaultValue="nill"
                      style={{ width: '80%' }}
                      name="city_name"
                      onChange={this.handle_change_city_from}>
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
                      showSearch
                      optionFilterProp="children"
                      defaultValue="nill"
                      style={{ width: '80%' }}
                      name="city_name"
                      onChange={this.handle_change_city_to}>
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
                      showSearch
                      optionFilterProp="children"
                      defaultValue="nill"
                      style={{ width: '80%' }}
                      name="order_type"
                      onChange={this.handle_change_order_type}>
                        {
                            this.state.OrderType.map(function(value, index){
                                return <Option value={value.url} >{value.order_type}</Option>;
                            })
                        }
                       </Select>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Container </span>
                      </Col>
                      <Col span="8">
                        <Input defaultValue="nill" size="large" style={{ width: 394 }} name="container_number" onChange={this.handleChangeInputValue_order_detail}/>
                      </Col>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> LR </span>
                      </Col>
                      <Col span="8">
                        <Input defaultValue="nill" size="large" style={{ width: 394 }} name="lr_number" onChange={this.handleChangeInputValue_order_detail}/>
                      </Col>
                    </InputGroup>

                    </ContentHolder>
                  </Box>
                </Col>
                <Col md={12} sm={12} xs={24} style={colStyle}>
                  <Box>
                    <ContentHolder>

                    <InputGroup compact style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Date </span>
                      </Col>
                      <DatePicker style={{ width: 300 }}
                      onChange={this.handleChangeDateValue}
                      defaultValue={moment(this.state.order_detail.order_date, dateFormat)}
                      />
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Freight </span>
                      </Col>
                      <Col span="8">
                        <Input defaultValue={0}  type="number" style={{ width: 300 }} name="freight" onChange={this.handleChangeInputValue_calculation}/>
                      </Col>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Liftoff </span>
                      </Col>
                      <Col span="8">
                        <Input defaultValue={0} type="number" style={{ width: 300 }} name="liftoff" onChange={this.handleChangeInputValue_calculation}/>
                      </Col>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Advanced </span>
                      </Col>
                      <Col span="8">
                        <Input defaultValue={0} type="number" style={{ width: 300 }} name="advanced" onChange={this.handleChangeInputValue_calculation}/>
                      </Col>
                    </InputGroup>

                    <InputGroup size="large" style={{ marginBottom: '15px' }}>
                      <Col span="3">
                        <span> Balance </span>
                      </Col>
                      <Col span="8">
                        <Input value={this.state.order_detail.balance} type="number" style={{ width: 300 }} name="balance"/>
                      </Col>
                    </InputGroup>

                    <Button id="submit_button" type="primary" style={margin, button_width, {background: "blue"}} onClick={this.AddNewOrder}>
                      {"Add Order"}
                    </Button>



                    <Button id="backup_button" type="success" style={margin, button_width, {background: "purple", color: "white"}} onClick={this.TakeBackup}>
                      {"Take Backup"}
                    </Button>


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



// <InputGroup size="large" style={{ marginBottom: '15px' }}>
//   <Col span="3">
//     <span> Overload </span>
//   </Col>
//   <Col span="8">
//     <Input defaultValue={0} type="number" style={{ width: 300 }} name="overload" onChange={this.handleChangeInputValue_calculation}/>
//   </Col>
// </InputGroup>

// <InputGroup size="large" style={{ marginBottom: '15px' }}>
//   <Col span="3">
//     <span> Diesel </span>
//   </Col>
//   <Col span="8">
//     <Input defaultValue={0} type="number" style={{ width: 300 }} name="diesel" onChange={this.handleChangeInputValue_calculation}/>
//   </Col>
// </InputGroup>

// <InputGroup size="large" style={{ marginBottom: '15px' }}>
//   <Col span="3">
//     <span> Tds </span>
//   </Col>
//   <Col span="8">
//     <Input defaultValue={0} type="number" style={{ width: 300 }} name="tds" onChange={this.handleChangeInputValue_calculation}/>
//   </Col>
// </InputGroup>
