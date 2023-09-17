import { useQuery,useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { toast } from "react-toastify";
import { Tokenn } from '../Helpers/TokenLogic';
import { ChatRequest } from '../Requests/chatReq';
import { AuthSys } from '../Requests/auth';



export function useFetchUserData() {
    return useQuery('userData', async () => {
        if(Tokenn.checkToken){
            try {
      const res = await AuthSys.userLogedData();
      console.log(res)
      return res.data;
      } catch (err) {
    //   toast(err.response.data.message, { hideProgressBar: false, autoClose: 4000, type: 'error' })
      console.log("converseData querry");
      console.log(err);
      console.log(err.message);
      }
        }
    });
  }
  