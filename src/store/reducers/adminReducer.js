import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender : false,
    isLoadingPosition: false,
    isLoadingRole: false,
    isLoadingRequired : false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    timeDoctor: [],
    allRequired: [],
    extraInfo: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.FETCH_GENDER_START:
          
            state.isLoadingGender = true;
            return {
                ...state,
               
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
     
      
            state.genders = action.data
            state.isLoadingGender = false;
            return {
                ...state
               
            }
        case actionTypes.FETCH_GENDER_FAILED:
    
            state.genders = [];
            state.isLoadingGender = false;

            return {
                ...state
               
            }

            ////

            case actionTypes.FETCH_REQUIRE_DOCTOR_START:
                
            state.isLoadingRequired = true;
            return {
                ...state,
               
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_SUCCESS:
          
        
            state.allRequired = action.data
            state.isLoadingRequired = false;
            return {
                ...state
               
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_FAILED:
    
            state.allRequired = [];
            state.isLoadingRequired = false;

            return {
                ...state
               
            }
      

            //case position
            case actionTypes.FETCH_POSITION_START:
    
            state.isLoadingPosition = true;
            return {
                ...state,
               
            }
            case actionTypes.FETCH_POSITION_SUCCESS:
  
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state
               
            }

            case actionTypes.FETCH_POSITION_FAILED:
           
            state.positions = [];
            state.isLoadingPosition = false;

            return {
                ...state
            }

             //case role
             case actionTypes.FETCH_ROLE_START:
               
                state.isLoadingRole = true;
                return {
                    ...state,
                    
             }
             case actionTypes.FETCH_ROLE_SUCCESS:
                
                state.roles = action.data
                state.isLoadingRole = false;
                return {
                    ...state
                    
                }
             case actionTypes.FETCH_ROLE_FAILED:
                 
                state.roles = [];
                state.isLoadingRole = false;
    
                return {
                    ...state
                }
            
            //case fetch all users
            case actionTypes.FETCH_ALL_USERS_SUCCESS:
            
                state.users = action.users;
                return {
                    ...state
                }

            case actionTypes.FETCH_ALL_USERS_FAILED:
                
                state.users = [];
                return {
                    ...state
                }
            


            case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
              
               
                state.topDoctors = action.dataDoctor;
                return {
                    ...state
                }

            case actionTypes.FETCH_TOP_DOCTOR_FAILED:
                state.topDoctors = [];
                return {
                    ...state
                }


                

                // get all doc doctor
            case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                state.allDoctors = action.dataDR;
                return {
                    ...state
                }

            case actionTypes.FETCH_ALL_DOCTOR_FAILED:
                state.allDoctors = [];
                return {
                    ...state
                }


            case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
                
                state.timeDoctor = action.dataTime;
                
                    return {
                    ...state
                }
    
            case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
                state.timeDoctor = [];
                return {
                    ...state
                }

                ///



            case actionTypes.FETCH_EXTRA_INFO_SUCCESS:
     
                state.extraInfo = action.data;
                return {
                    ...state
                }

            case actionTypes.FETCH_EXTRA_INFO_FAILED:
                state.extraInfo = [];
                return {
                    ...state
                }


        default:
            return state;
    }
}

export default adminReducer;