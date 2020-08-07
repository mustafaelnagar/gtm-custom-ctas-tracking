
 /*Business Logic: 

1. Get all the CTAs links 
2. Check CTAs have specific tag
    1. If yes, get the value & override the tag
    2. If no, append to the url the new tag with the new value  
3. Update the urls on the page 
4. All Done! 
*/ 

// function get all links with class name 
var css_class = "mv-btn--nopill font-bold"; // the css selector for the cta
var url_param = "otag";//url parameter 
var url_param_value = "stories";// parameter value 
var CTAS = new Array(); // all the CTAs on the page 
var CTA =""; // the CTA obj 
var new_url = ""; // temp url value to update each url in case we have multi CTAs on the page 
var debugging_msg; // only to debug and test


/*
Function name: updateCtas 
Inputs: 
       css selector ( CTA selector) 
       URL parameter
       Parameter value 
Outputs: 
       Void. 
       Will update the CTAs. 

logic: 
1. Scan the page 
2. Get all the links 
3. check the parameter of otag if it exists 
4. if it exists, replace it with the stories tag
5. else add it 
 */

function updateCtas(css_class,url_param,url_param_value){
   
    // get all links by css class
    CTAS = document.getElementsByClassName(css_class);
   
    for(var i=0;i<CTAS.length;i++){
        //var str = CTAS[1].getElementsByTagName('a')[0].href; wrong! not vanilla!
        //get the link 
        CTA = CTAS[i].href;

       // console.log("hey, this CTA = "+CTA);

        debugging_msg += '\n \n '+i+'- we got this url on the page '+ CTA;
        //get the link parameters 
        debugging_msg += '\n \n ' + 'and it has the following params' +'\n \n '
        var url_parameters = getParams (CTA);

        debugging_msg +="\n the current CTA = "+CTA+"\n";
        //update the url parameter
       new_url = updatrUrlParam(CTA,url_param,url_param_value);

      debugging_msg+= '\n the result of updating this url is'+new_url+'\n '; 

      this.CTAS[i].href = this.new_url.href;
       
       //var res = str.split("?"); // split the base url from the paramaters and check only the base url! not what I want to implement the business longic 
        //links.push(res[0]);
 
        console.log(debugging_msg);
    }
    
}// end getlinks function

    //function get url parameters 
    function getParams (url,static_param) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
    }
    //debugging 
    debugging_msg += "\n"+"the url "+url+" \n has the following params ";
    console.log(params); //log the params as obj

    var is_parm_exist = checkParmExists(url,static_param);
    
 
} 

 
function checkParmExists(url,param){
 
    if(url.indexOf(param) != -1){
      //  console.log('yes this url.'+url+'has this value'+param);
        return true; 
    }
    else {
    //console.log('No this url. \n'+url+'\n Doesn\'t have this value: \n'+param);
    return false;
    }
} //end function 

//update the actul parameter on the page 
function updatrUrlParam(CTA,url_param,url_param_value){
//href.searchParams.set('param', 'new_value');
 // updating the param value 
 //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set
      let url = new URL(CTA);
       url.searchParams.set(url_param, url_param_value);
       
    url.searchParams.set(url_param, url_param_value);
    return url;
    
    debugging_msg += 'I\'m updating this url params'+url;

}

//console.log(debugging_msg);