import React, { Component } from 'react';
import { Col, Row, Icon } from 'antd';
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

export default class InputField extends Component {

  constructor(props) {
      super(props);
      this.state = {
          CustomerCompanyDetail:[],
          TruckDetail:[],
          CityDetail:[],
          PackageDetail:[],
          OrderType:[],
          CustomerCompanyDetailValue:"",
          TruckDetailValue:"",
          ContainerDetailValue:"",
          CityDetailValue:"",
          PackageDetailValue:"",
          OrderTypeValue:"",
      }

      this.fetchAllDetails = this.fetchAllDetails.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.getCookie = this.getCookie.bind(this)
      this.AddCustomerCompanyDetailValue = this.AddCustomerCompanyDetailValue.bind(this)
      this.AddTruckDetailValue = this.AddTruckDetailValue.bind(this)
      this.AddCityDetailValue = this.AddCityDetailValue.bind(this)
      this.AddPackageDetailValue = this.AddPackageDetailValue.bind(this)
      this.AddOrderTypeValue = this.AddOrderTypeValue.bind(this)
      this.PostApi = this.PostApi.bind(this)
 
  };

  componentWillMount() {
      this.fetchAllDetails()
  }

  fetchAllDetails(){
      fetch('http://127.0.0.1:8000/api/customercompanydetail/').then(response => response.json()).then(data =>this.setState({CustomerCompanyDetail: data}))
      fetch('http://127.0.0.1:8000/api/truckdetail/').then(response => response.json()).then(data =>this.setState({TruckDetail: data}))
      fetch('http://127.0.0.1:8000/api/containerdetail/').then(response => response.json()).then(data =>this.setState({ContainerDetail: data}))
      fetch('http://127.0.0.1:8000/api/citydetail/').then(response => response.json()).then(data =>this.setState({CityDetail: data}))
      fetch('http://127.0.0.1:8000/api/packagedetail/').then(response => response.json()).then(data =>this.setState({PackageDetail: data}))
      fetch('http://127.0.0.1:8000/api/ordertype/').then(response => response.json()).then(data =>this.setState({OrderType: data}))
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

  handleChange(evt) {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }

  PostApi(url, data){
    var csrftoken = this.getCookie('csrftoken')
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data)
    }).then((response) => {
        this.fetchAllDetails()
    }).catch(function(error) {
        console.log('ERROR:', error)
    })
  }

  AddCustomerCompanyDetailValue(){
    var value = this.state.CustomerCompanyDetailValue
    var url = `http://127.0.0.1:8000/api/customercompanydetail/`;

    var data = {
        company_name : value
    }
    this.PostApi(url, data)
    this.state.CustomerCompanyDetailValue = ""
  }

  AddTruckDetailValue(){
    var value = this.state.TruckDetailValue  
    var url = `http://127.0.0.1:8000/api/truckdetail/`;

    var data = {
        truck_number : value
    }
    this.PostApi(url, data)
    this.state.TruckDetailValue = ""
  }

  AddCityDetailValue(){
    var value = this.state.CityDetailValue
    var url = `http://127.0.0.1:8000/api/citydetail/`;

    var data = {
        city_name : value
    }
    this.PostApi(url, data)
    this.state.CityDetailValue = ""
  }

  AddPackageDetailValue(){
    var value = this.state.PackageDetailValue
    var url = `http://127.0.0.1:8000/api/packagedetail/`;

    var data = {
        package_size : value
    }
    this.PostApi(url, data)
    this.state.PackageDetailValue = ""
  }

  AddOrderTypeValue(){
    var value = this.state.OrderTypeValue
    var url = `http://127.0.0.1:8000/api/ordertype/`;

    var data = {
        order_type : value
    }
    this.PostApi(url, data)
    this.state.OrderTypeValue = ""
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
      width: '150px'
    };

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box
              title="Add Details"
              subtitle=""
            >
              <ContentHolder>

                <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Col span="3">
                    <span> Company Name </span>
                  </Col>
                  <Select defaultValue="nill" style={{ width: '33.4%' }}>
                    {
                        this.state.CustomerCompanyDetail.map(function(value, index){
                            return <Option value={value.url} >{value.company_name}</Option>;
                        })
                    }
                  </Select>

                  <Col span="8">
                    <Input value={this.state.CustomerCompanyDetailValue} name="CustomerCompanyDetailValue" onChange={this.handleChange}/>
                  </Col>
                  <Col span="3">
                    <Button type="primary" style={margin, button_width} onClick={this.AddCustomerCompanyDetailValue}>
                      {"Add Company"}
                    </Button>
                  </Col>

                </InputGroup>

                <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Col span="3">
                    <span> Truck Number </span>
                  </Col>
                  <Select defaultValue="nill" style={{ width: '33.4%' }}>
                    {
                        this.state.TruckDetail.map(function(value, index){
                            return <Option value={value.url} >{value.truck_number}</Option>;
                        })
                    }
                   </Select>

                  <Col span="8">
                    <Input value={this.state.TruckDetailValue} name="TruckDetailValue" onChange={this.handleChange}/>
                  </Col>
                  <Col span="3">
                    <Button type="primary" style={margin, button_width} onClick={this.AddTruckDetailValue}>
                      {"Add Truck"}
                    </Button>
                  </Col>

                </InputGroup>

                <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Col span="3">
                    <span> Package Size </span>
                  </Col>
                  <Select defaultValue="40" style={{ width: '33.4%' }}>
                    {
                        this.state.PackageDetail.map(function(value, index){
                            return <Option value={value.url} >{value.package_size}</Option>;
                        })
                    }
                   </Select>

                  <Col span="8">
                    <Input value={this.state.PackageDetailValue} name="PackageDetailValue" onChange={this.handleChange}/>
                  </Col>
                  <Col span="3">
                    <Button type="primary" style={margin, button_width} onClick={this.AddPackageDetailValue}>
                      {"Add Package"}
                    </Button>
                  </Col>

                </InputGroup>

                <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Col span="3">
                    <span> City </span>
                  </Col>
                  <Select defaultValue="nill" style={{ width: '33.4%' }}>
                    {
                        this.state.CityDetail.map(function(value, index){
                            return <Option value={value.url} >{value.city_name}</Option>;
                        })
                    }
                   </Select>

                  <Col span="8">
                    <Input value={this.state.CityDetailValue} name="CityDetailValue" onChange={this.handleChange}/>
                  </Col>
                  <Col span="3">
                    <Button type="primary" style={margin, button_width} onClick={this.AddCityDetailValue}>
                      {"Add City"}
                    </Button>
                  </Col>

                </InputGroup>

                <InputGroup compact style={{ marginBottom: '15px' }}>
                  <Col span="3">
                    <span> Order Type </span>
                  </Col>
                  <Select defaultValue="nill" style={{ width: '33.4%' }}>
                    {
                        this.state.OrderType.map(function(value, index){
                            return <Option value={value.url} >{value.order_type}</Option>;
                        })
                    }
                   </Select>
                  <Col span="8">
                    <Input value={this.state.OrderTypeValue} name="OrderTypeValue" onChange={this.handleChange}/>
                  </Col>
                  <Col span="3">
                    <Button type="primary" style={margin, button_width} onClick={this.AddOrderTypeValue}>
                      {"Add Type"}
                    </Button>
                  </Col>

                </InputGroup>

              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
