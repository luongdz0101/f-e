import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ManageDoctor.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTIONS, languages } from '../../../utils/constant'
import Select from 'react-select';
import {getDetailDoctor} from '../../../services/userServices'




const mdParser = new MarkdownIt();
class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHtml: '',
         
            description: '',
            arrDoctor: [],
            hasOldData: false,
            fullNameDoctor: '',


            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: [],
            selectedSpecialty: [],
            addressClinic: '',
            nameClinic: '',
            clinicId: '',
            specialtyId: '',
            note: ''

        }
    }

    componentDidMount() {

        this.props.fetchAllDoctorRedux();
        this.props.fetchRequiredDoctor();
        
       
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                arrDoctor: dataSelect
            })


        }
     

        if(prevProps.requireDoctor !== this.props.requireDoctor){
           let  dataSelectPrice = this.buildDataInputSelect(this.props.requireDoctor.resPrice,'PRICE')
           let  dataSelectPayment = this.buildDataInputSelect(this.props.requireDoctor.resPayment, 'PAYMENT')
           let  dataSelectProvince= this.buildDataInputSelect(this.props.requireDoctor.resProvince,'PROVINCE')
           let dataSelectSpecialty = this.buildDataInputSelect(this.props.requireDoctor.resSpecialty,'SPECIALTY')
           let dataSelectClinic = this.buildDataInputSelect(this.props.requireDoctor.resClinic,'CLINIC')
           this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
           })


           if(prevProps.language !== this.props.language){
            let  dataSelectPrice = this.buildDataInputSelect(this.props.requireDoctor.resPrice,'PRICE')
            let  dataSelectPayment = this.buildDataInputSelect(this.props.requireDoctor.resPayment, 'PAYMENT')
            let  dataSelectProvince= this.buildDataInputSelect(this.props.requireDoctor.resProvince,'PROVINCE')
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            this.setState({
                arrDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
           
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let {language} = this.props
        
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {

                if(type === 'USERS') {
                    let object = {};
                    let labelVi =  `${item.lastName} ${item.firstName}` 
                    let labelEn = `${item.firstName} ${item.lastName} `
                    object.label = language === languages.VI ? labelVi : labelEn
    
                    object.value = item.id;
                    result.push(object)
                }

                if(type === 'PRICE' ) {
                    let object = {};
                    let labelVi =  `${item.valueVi} VND` 
                    let labelEn = `${item.valueEn}  USD`
                    object.label = language === languages.VI ? labelVi : labelEn
    
                    object.value = item.keyMap;
                    result.push(object)
                }
                
                if( type === "PAYMENT" || type === "PROVINCE") {
                    let object = {};
                    let labelVi =  `${item.valueVi} ` 
                    let labelEn = `${item.valueEn}  `
                    object.label = language === languages.VI ? labelVi : labelEn
    
                    object.value = item.keyMap;
                    result.push(object)
                }
                if( type === "SPECIALTY") {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                }

                if( type === "CLINIC") {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                }

            })
           
        }

        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let {hasOldData} = this.state;

        
        this.props.saveDoctorRedux({
            contentHtml: this.state.contentHtml,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
       
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,

            clinicId: this.state.selectedClinic &&  this.state.selectedClinic.value ? this.state.selectedClinic.value : '',

            specialtyId: this.state.selectedSpecialty.value
        })
    }


     handleOnChangeText = (event, id) => {
        let copyState = {...this.state}

        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

     handleChange = async(selectedOption, name) => {
        this.setState({ selectedOption });
         let res = await getDetailDoctor(selectedOption.value);

         let {listPayment, listPrice, listProvince, listSpecialty, listClinic} = this.state


         if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            let addressClinic = '';
            let nameClinic = '';
            let note = '';
            let paymentId = '';
            let priceId = '';
            let provinceId = '';
            let specialtyId = ''
            let clinicId = ''

            let selectedPayment = '';
            let selectedPrice = '';
            let selectedProvince = '';
            let selectedSpecialty = '';
            let selectedClinic = ''
        

            if(res.data.Doctor_info) {

                addressClinic = res.data.Doctor_info.addressClinic;
                nameClinic = res.data.Doctor_info.nameClinic;
                note = res.data.Doctor_info.note;
                paymentId= res.data.Doctor_info.paymentId
                priceId= res.data.Doctor_info.priceId
                provinceId= res.data.Doctor_info.provinceId
                specialtyId = res.data.Doctor_info.specialtyId
                clinicId = res.data.Doctor_info.clinicId

                 selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                  selectedPrice= listPrice.find(item => {
                    return item && item.value === priceId
                })

                 selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })


                

            }


            this.setState({
                
                contentHtml: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,

                addressClinic : addressClinic,
                nameClinic : nameClinic,
                note : note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                hasOldData:true
            })
         }else{
            this.setState({
                contentHtml: '',
                contentMarkdown: '',
                description: '',
                addressClinic : '',
                nameClinic : '',
                note : '',
                hasOldData:false,
                selectedSpecialty: ''
            })
         }
    };

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let tateName = name.name;

        let copyState = {...this.state};
        copyState[tateName] = selectedOption

        this.setState({
            ...copyState
        })
        
    }

 



    render() {
        
        let {hasOldData, listSpecialty, selectedPayment} = this.state

  
      
       
        return (
            <div className='manage-doctor__container'>
               <div className="manage-doctor__title"> Thông tin bác sĩ</div>
               <div className="container">
                    <div className="row">
                        <div className="col-6 mt-4">
                            <label htmlFor="">Chọn bác sĩ</label>
                            <Select
                                
                                onChange={this.handleChange}
                                value={this.state.selectedOption}
                                options={this.state.arrDoctor}
                                placeholder = {'Chọn bác sĩ'}
                                
                            />
                        </div>
                        <div className="col-6 mt-4">
                        <label >Thông tin giới thiệu</label>
                            <textarea className="form-control textarea-body" rows="4"
                            
                                onChange={(event) => this.handleOnChangeText(event, 'description') }
                                value={this.state.description}
                            >
                                
                            </textarea>
                        </div>

                        <div className="col-4 mt-4 form-group">
                            <label htmlFor="">Chọn Giá</label>
                            <Select
                                
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedPrice}
                                options={this.state.listPrice}
                                placeholder = {'Chọn Giá'}
                                name = "selectedPrice"
                        
                            
                            />
                        </div>
                        <div className="col-4 mt-4 form-group">
                            <label htmlFor="">Chọn phương thức thanh toán</label>
                            <Select
                                
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedPayment}
                                options={this.state.listPayment}
                                placeholder = {'Chọn phương thức thanh toán'}            

                                name= 'selectedPayment'
                                    
                                
                            />
                        </div>
                        <div className="col-4 mt-4 form-group">
                            <label htmlFor="">Chọn tỉnh thành</label>
                            <Select
                                
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedProvince}
                                options={this.state.listProvince}
                                placeholder = {'Chọn tỉnh thành'}
                                name = 'selectedProvince'
                            />
                        </div>
                        <div className="col-6 mt-4 form-group">
                            <label htmlFor="">Địa chỉ phong khám</label>
                            <input className='form-control' type="text" 

                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic') }
                            value={this.state.addressClinic}
                            />
                        </div>

                        <div className="col-6 mt-4 form-group">
                            <label htmlFor="">Tên phong khám</label>
                            <input className='form-control' type="text" 

                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic') }
                            value={this.state.nameClinic}
                            />
                        </div>
                        <div className="col-6 mt-4 form-group">
                            <label htmlFor="">Chọn chuyên khoa</label>
                            <Select
                                
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedSpecialty}
                                options={this.state.listSpecialty}
                                placeholder = {'Chọn chuyên khoa'}
                                name = 'selectedSpecialty'
                            />
                        </div>
                        <div className="col-6 mt-4 form-group">
                            <label htmlFor="">Chọn phòng khám</label>
                            <Select
                                
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedClinic}
                                options={this.state.listClinic}
                                placeholder = {'Chọn phòng khám'}
                                name = 'selectedClinic'
                            />
                        </div>

                        <div className="col-12 mt-4 form-group">
                            <label htmlFor="">Note</label>
                            <textarea className="form-control " rows="4"

                            onChange={(event) => this.handleOnChangeText(event, 'note') }
                            value={this.state.note}
                            />
                        </div>

                        <div className="col-12 mt-4">
                            <MdEditor style={{ height: '500px' }} 
                                renderHTML={text => mdParser.render(text)} 
                                onChange={this.handleEditorChange} 
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <button className={hasOldData === true ? "save-content-doctor btn btn-warning" : "create-content-doctor btn  btn-primary"} 
                                onClick={() => this.handleSaveContentMarkdown()}>
                                {hasOldData === true ?
                                
                                    <span>Lưu thông tin</span> :
                                    <span>Tạo mới thông tin</span> 
                                }
                                
                            </button>
                        </div>

                    </div>
                    
               </div>


              
            </div>
           
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctors,
        requireDoctor: state.admin.allRequired
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDoctorRedux: (data) => dispatch(actions.saveDoctor(data)),
       fetchRequiredDoctor: () => dispatch(actions.fetchRequiredDoctorStart())
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
