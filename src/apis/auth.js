import axios from 'axios';

export class AuthService {

    // client = new Client();
    // account;

    // constructor() {
    // this.client
    //     .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    //     .setProject(conf.appwriteProjectId);
    // this.account = new Account(this.client)
    // }

    async createAccount({ fullName, email, mobile, username, password }) {
        try {
            const regis = await axios.post('/api/v1/users/register', { fullName, email, mobile, username, password });

            if (regis) {
                return await axios.post('/api/v1/users/login', { email, password });
            }

        } catch (error) {
            console.log("Apis serive :: createAccount :: error", error);
            return error.response
        }

    }

    async updateProfile({ fullName, mobile, username, email, altMobile, softSkills, language, address, profession, social, description, skills }) {
        try {
            return await axios.patch('/api/v1/users/update-account', { fullName, mobile, username, email, altMobile, softSkills, language, address, profession, description, social, skills });

            // if(regis){
            //     return await axios.post('/api/v1/users/login', {email, password});
            // }

        } catch (error) {
            console.log("Apis serive :: updateProfile :: error", error);
        }

    }

    async updateAvatar(avatar) {
        try {
            const formdata = new FormData()
            formdata.append('avatar', avatar)
            return await axios.patch('/api/v1/users/avatar', formdata, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                },
            });

            // if(regis){
            //     return await axios.post('/api/v1/users/login', {email, password});
            // }

        } catch (error) {
            console.log("Apis serive :: updateAvatar :: error", error);
        }

    }

    async updateCoverImage(coverImage) {
        try {
            const formdata = new FormData()
            formdata.append('coverImage', coverImage)
            return await axios.patch('/api/v1/users/cover-image', formdata, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                },
            });

            // if(regis){
            //     return await axios.post('/api/v1/users/login', {email, password});
            // }

        } catch (error) {
            console.log("Apis serive :: updateCoverImage :: error", error);
        }

    }

    async addEducation(items) {
        try {
            // const formdata = new FormData()
            // formdata.append('coverImage',coverImage)
            // return await axios.patch('/api/v1/users/cover-image', formdata,{
            //     headers: {
            //       'Content-Type': `multipart/form-data;`
            //     },});
            return await axios.patch('/api/v1/users/education', items);

            // if(regis){
            //     return await axios.post('/api/v1/users/login', {email, password});
            // }

        } catch (error) {
            console.log("Apis serive :: addEducation :: error", error);
        }

    }

    async login({ email, password }) {

        try {
            return await axios.post('/api/v1/users/login', { email, password });

        } catch (error) {
            return error.response
            // console.log("Apis serive :: Login :: error", error);
        }

    }

    // async getCurrentUser() {

    //     try {
    //         return await axios.get('/api/v1/users/current-user')

    //     } catch (error) {
    //         console.log("Apis Service :: getCurrentUser :: error", error);
    //     }

    //     return null;
    // }

    // async getAllProject() {

    //     try {
    //         return await axios.get('/api/v1/project/all')
    //     } catch (error) {
    //         console.log("Apis Service :: getAllProject :: error", error);
    //     }

    // }

    async logout() {
        try {
            await axios.post('/api/v1/users/logout');
        } catch (error) {
            console.log("Apis Service :: Logout :: error", error);
        }

    }

    // async getUserProfile(username) {

    //     try {
    //         return await axios.get('/api/v1/users/detail', {
    //             params: {
    //                 username: username
    //             }
    //         })

    //     } catch (error) {
    //         console.log("Apis Service :: getUserProfile :: error", error);
    //     }

    //     return null;
    // }

    // async myProject() {

    //     try {
    //         return await axios.get('/api/v1/project/')

    //     } catch (error) {
    //         console.log("Apis Service :: myProject :: error", error);
    //     }

    //     return null;
    // }

    // async getProjectDetail(projectId) {
    //     // console.log(data)
    //     try {
    //         return await axios.get('/api/v1/project/detail/', {
    //             params: {
    //                 projectId: projectId
    //             }
    //         })

    //     } catch (error) {
    //         console.log("Apis Service :: getProjectDetail :: error", error);
    //     }

    //     return null;
    // }

    async addProject(data) {
        try {
            const formdata = new FormData()
            formdata.append('coverImage', data.coverImage[0])
            formdata.append('domain', data.domain)
            formdata.append('startOn', data.startOn)

            if (data.completedOn != "Invalid Date" && data.completedOn != "1970-01-01" && data.completedOn != null) {
                formdata.append('completedOn', data.completedOn)
            }

            formdata.append('shortDesc', data.shortDesc)
            formdata.append('title', data.title)
            if (data.description.length > 0) {
                data.description.map((element, index) => {
                    // console.log(element.points);
                    formdata.append(`description[${index}][points]`, element.points)
                })
            }

            formdata.append('status', data.status)

            return await axios.post('/api/v1/project', formdata, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                },
            });

        } catch (error) {
            console.log("Apis serive :: addProject :: error", error);
        }

    }

    async updateProject(id, data) {
        try {
            const formdata = new FormData()
            formdata.append('Id', id)
            formdata.append('coverImage', data.coverImage[0])
            formdata.append('domain', data.domain)
            formdata.append('startOn', data.startOn)
            if (data.completedOn != "Invalid Date" && data.completedOn != "1970-01-01" && data.completedOn != null) {
                formdata.append('completedOn', data.completedOn)
            }
            formdata.append('shortDesc', data.shortDesc)
            formdata.append('title', data.title)
            if (data.description.length > 0) {
                data.description.map((element, index) => {
                    // console.log(element.points);
                    formdata.append(`description[${index}][points]`, element.points)
                })
            }

            formdata.append('status', data.status)

            return await axios.patch('/api/v1/project/detail', formdata, {
                headers: {
                    'Content-Type': `multipart/form-data;`
                },
            });

        } catch (error) {
            console.log("Apis serive :: updateProject :: error", error);
        }

    }


    async getExperienceDetail(Id) {
        try {
            return await axios.get('/api/v1/users/experience', {
                params: {
                    Id: Id
                }
            })

        } catch (error) {
            console.log("Apis Service :: getExperienceDetail :: error", error);
        }

        return null;
    }

    async updateExperience(id, title, startOn, exitOn, companyLocation, companyName, designation, description, isCurrent) {
        let compeDate = "";
        if (exitOn == "Invalid Date" || exitOn == "1970-01-01" || exitOn == null) {
            compeDate = null;
        } else {
            compeDate = exitOn;
        }

        try {
            return await axios.patch('/api/v1/users/experience', { Id: id, title, startOn, exitOn: compeDate, companyLocation, companyName, designation, description, isCurrent })

        } catch (error) {
            console.log("Apis Service :: updateExperience :: error", error);
        }

        return null;
    }
    
    async addExperience(title, startOn, exitOn, companyLocation, companyName, designation, description, isCurrent) {

        let compeDate = "";
        if (exitOn == "Invalid Date" || exitOn == "1970-01-01" || exitOn == null) {
            compeDate = null;
        } else {
            compeDate = exitOn;
        }

        try {
            return await axios.post('/api/v1/users/experience', { title, startOn, exitOn: compeDate, companyLocation, companyName, designation, description, isCurrent })

        } catch (error) {
            console.log("Apis Service :: addExperience :: error", error);
        }

        return null;
    }

}
const authService = new AuthService();

export default authService


export async function getReq(reqStr, paramObj) {
    try {
      const response = await axios.get(`/api/v1/${reqStr}`, paramObj);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  
  export async function postReq(reqStr, data) {
    try {
      const response = await axios.post(`/api/v1/${reqStr}`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  
  export async function patchReq(reqStr, data) {
    try {
      const response = await axios.patchForm(`/api/v1/${reqStr}`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  export async function deleteReq(reqStr, paramObj) {

    try {
      const response = await axios.delete(`/api/v1/${reqStr}`, paramObj);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }