// retrieve all the child item
cate_items = document.querySelectorAll("#cato-tree > ul > li > a")

// organized sub-category item into main-category
main_cate_list = []
sub_cate_list = []
for (var i = 0; i < cate_items.length; i++) {
    
    // split count number and text
    // cate_text = cate_items[i].innerText.split(" ")[0]
    
    cate_text = cate_items[i].innerText
    
    // filter main category
    if( cate_text.indexOf("/") >= 0 ){
        sub_cate_list.push({ "text": cate_text, "href": cate_items[i].href })
    }else{
        main_cate_list.push({ "text": cate_text, "href": cate_items[i].href, "childs": [] })
    }
    cate_items[i].parentNode.remove()
}


// contruct hireachy category structure
for (var i = 0; i < main_cate_list.length; i++){
    for(var j = 0; j < sub_cate_list.length; j++){
        
        sub_cate_text = sub_cate_list[j].text.split(" ")[0]
        main_cate_text = main_cate_list[i].text.split(" ")[0]
        // console.log("sub: " + sub_cate_text + ", main: " + main_cate_text)
        if (sub_cate_text.indexOf(main_cate_text) >= 0 ){
            main_cate_list[i].childs.push(sub_cate_list[j])
            // console.log("hit!")
        }
    }
}       


// create and append  hireachy category to DOM
cate_root = document.querySelectorAll("#cato-tree > ul")[0]


for (var i = 0; i < main_cate_list.length; i++){
    
    a = document.createElement("a")
    a.innerText = main_cate_list[i].text
    a.href = main_cate_list[i].href

    li = document.createElement("li")
    li.appendChild(a)
    cate_root.appendChild(li)

    // console.log(main_cate_list[i].text)

    if (main_cate_list[i].childs.length != 0){
                
        sub_ul = document.createElement("ul")
        for (var j = 0; j < main_cate_list[i].childs.length; j++){

            sub_li = document.createElement("li")
            sub_a = document.createElement("a")
            
            child = main_cate_list[i].childs[j]
            sub_a.textContent = child.text.split("/")[1]
            sub_a.setAttribute('href', child.href)  
            
            sub_li.appendChild(sub_a)
            sub_ul.appendChild(sub_li)
        }
        cate_root.appendChild(sub_ul)   
    }
}