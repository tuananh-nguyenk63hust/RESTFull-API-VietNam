const util=require("util")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
fetchData = async(a,b) =>{
    var e=new XMLHttpRequest;
    e.onreadystatechange = function(){
        4===e.readyState && b(e.responseText);
        
    }
    
    e.open('GET',a);
    e.send();
}
csv2array = function(a, b) {
    void 0 == b && (b = ",");
    b && 1 < b.length && (b = ",");
    for (var e = 0, c = a.charAt(e), g = 0, h = 0, k = []; "" != c; ) {
        for (; " " == c || "\t" == c || "\r" == c; )
            c = a.charAt(++e);
        var m = "";
        if ('"' == c) {
            c = a.charAt(++e);
            do
                '"' != c && (m += c,
                c = a.charAt(++e)),
                '"' == c && '"' == a.charAt(e + 1) && (m += '"',
                e += 2,
                c = a.charAt(e));
            while ("" != c && '"' != c);
            if ("" == c)
                throw "Unexpected end of data, double-quote expected";
            c = a.charAt(++e)
        } else
            for (; "" != c && c != b && "\n" != c && " " != c && "\t" != c && "\r" != c; )
                m += c,
                c = a.charAt(++e);
        k.length <= g && k.push([]);
        for (k[g].push(m); " " == c || "\t" == c || "\r" == c; )
            c = a.charAt(++e);
        if (c == b)
            h++;
        else if ("\n" == c)
            h = 0,
            g++;
        else if ("" != c)
            throw "Delimiter expected after character " + e;
        c = a.charAt(++e)
    }
    return k
}
module.exports={
        get_total:(req,res)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            fetchData("https://vnexpress.net/microservice/sheet/type/covid19_2021_by_map",function(b){
                let data =csv2array(b);
                //console.log(res_data);
                let res_obj=new Object();
                let res_list=[];
                for (let i=1;i<=data.length-1;i++)
                {
                    let res_obj_i=new Object();
                    res_obj_i.key=data[i][1];
                    res_obj_i.Country=data[i][2];
                    res_obj_i.confirmed=data[i][3];
                    res_obj_i.new_confirmed=data[i][4];
                    res_obj_i.recoverd=data[i][5];
                    res_obj_i.deaths=data[i][6];
                    res_obj_i.people=data[i][9];
                    res_obj_i.days=data[i][12];
                    res_list.push(res_obj_i);
                }
                res_obj.list=res_list;
                //console.log(JSONres_obj);
                res.json(res_obj);
            })
    },
}