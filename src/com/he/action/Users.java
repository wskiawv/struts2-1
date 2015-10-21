package com.he.action;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.opensymphony.xwork2.ActionContext;
import com.he.action.base.BaseAction;

public class Users extends BaseAction{
	private String username;
	private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String user(){
		ActionContext context=ActionContext.getContext();
		Map requeryParams=context.getParameters();
		//String[] username=(String[]) requeryParams.get("username");
		Set<String> keySet=requeryParams.keySet();
		Map<String,String> params=new HashMap();
		for(String key:keySet){
			String[] values=(String[])requeryParams.get(key);
			
			//System.out.println(key);
			String sum="";
			for(String value:values){
				sum+=value;
				//System.out.println(value);
			}
			//System.out.println(sum);
			params.put(key, sum);
		}
		for(String name:params.keySet()){
			System.out.println(name);
			System.out.println(params.get(name));
		}
		/*for(String name:params.keySet()){
			System.out.println(name);
		}*/
		/*System.out.println(params.get("username"));
		System.out.println(username[0]);
		System.out.println(username.length);*/
		System.out.println("Statr user");
		return "index";
	}
	public String execute()throws Exception{
		System.out.println("default execute");
		if("admin".equals(username)&&"admin".equals(password)){
			return "success";
		}else{
			return "error";
		}		
	}
}
