const chat = document.getElementById("chatBox");

const input = document.getElementById("inputBox");

    input.addEventListener("keydown",(e)=>{
        if(e.key === "Enter") sendMessage()
    })

const fakeReplies = [
    "brooo you won’t believe what just happened 😭",
    "i was literally about to text you",
    "wait are you free rn?",
    "ngl today was kinda weird",
    "i’m so tired ",
    "tell me one thing honestly…",
    "okay but listen",
    "that actually makes sense",
    "no way 💀",
    "i thought the same thing",
    "why are you like this 😂",
    "hmm idk about that",
    "are you serious rn?",
    "stoppp 😭",
    "okay that’s kinda funny",
    "i’ll call you later maybe",
    "lemme finish this first",
    "brb 2 mins",
    "i’m back",
    "anyways what were you saying?"
];

let text = [    ]

localStorage.setItem("textCount","0");
let textCount = 0 % 4

function showTyping(delay) {
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.innerText = "typing...";
    typing.setAttribute("class","px-4 py-2 text-lg font-poppins border tracking-wide font-medium border-rose-300 w-fit mr-auto ml-8 max-w-xs break-words rounded-tr-4xl shadow-md  rounded-tl-4xl rounded-br-4xl  text-white bg-linear-to-br from-rose-400 via-pink-500 to-rose-500 ");
    chat.appendChild(typing);

    setTimeout(() => {
    typing.remove();
    }, delay+100);
}

function fakeReply(){
    let textCount = localStorage.getItem("textCount");

    const input = fakeReplies[textCount]

    if (input.trim() === "") return;

    const textFrom = "syd";
    let newtext = {text:input,sender: textFrom};
    text.push(newtext);

    
    textCount ++
    localStorage.setItem("textCount",JSON.stringify(textCount));
    saveChat()
    loadMsg()
}

function saveChat(){
    const strChat = JSON.stringify(text);
    localStorage.setItem("text",strChat);
    
}

function msg(txt, animate = false){
    const myText = txt;
    const spacer = document.getElementById("spacer");
    const msgDiv = document.createElement("div");
    msgDiv.setAttribute("class","px-4 py-2 text-lg font-poppins tracking-wide font-medium border border-emerald-300 w-fit ml-auto mr-8 max-w-xs break-words rounded-tr-4xl shadow-md  rounded-tl-4xl rounded-bl-4xl  text-white bg-linear-to-br from-emerald-400 via-emerald-300 to-emerald-400 ");
    msgDiv.innerText = myText ;
    
    chat.appendChild(msgDiv);
    if(animate){
        requestAnimationFrame(() => {
            msgDiv.classList.add("animate-msg");
        });
    }
}

function sydMsg(txt, animate = false){
    const myText = txt;

    const msgDiv = document.createElement("div");
    msgDiv.setAttribute("class","px-4 py-2 text-lg font-poppins border tracking-wide font-medium border-rose-300 w-fit mr-auto ml-8 max-w-xs break-words rounded-tr-4xl shadow-md  rounded-tl-4xl rounded-br-4xl  text-white bg-linear-to-br from-rose-400 via-pink-500 to-rose-500 ");
    msgDiv.innerText = myText ;

    
    chat.appendChild(msgDiv);
    if(animate){
        requestAnimationFrame(() => {
            msgDiv.classList.add("animate-msg");
        });
    }
}

function sendMessage(){
const input = document.getElementById("inputBox");

    if (input.value.trim() === "") return;

    const textFrom = "me";
    let newtext = {text:input.value,sender: textFrom};
    text.push(newtext);

    input.value =""

    saveChat()
    loadMsg();
    const delay = fakeReplies[textCount].length * 50;
    setTimeout(()=> showTyping(delay),delay-1000);
    setTimeout(()=>fakeReply(),delay);
    
}

function loadMsg(){
    chat.innerHTML = ""

    text = JSON.parse(localStorage.getItem("text")) || [];
    
    text.forEach((txt,index)=>{

        const isLast = index === text.length - 1;

        if(txt.sender == "me"){
            msg(txt.text, isLast);
        }
        else{
            sydMsg(txt.text, isLast);
        }
        
    })

    chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth"
});
}


loadMsg()