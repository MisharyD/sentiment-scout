require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const { OpenAI } = require('openai');

const systemPrompt = fs.readFileSync('system-prompt.txt', 'utf-8');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



async function getSentiment(comments) {
    //convert list of comments into one string but each comment is seperated by a comma and quotes
    commentsString = comments.map(item => `"${item}"`).join(", ");

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: commentsString
          }
        ],
        response_format: {
          type: "json_object"
        },
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
  
      //return the content of the response as json
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error:", error);
    }
}

data = getSentiment( [
    'Thanks so much for having me! Ronaldo and I also filmed my biggest video ever dropping November 30th on my channel.. it will blow your minds ;) Ronaldo is also dropping a video on his channel then too',
    'Hi ❤❤',
    'As ALHLAL Omk',
    'Two legend in one frame ❤ Sportsmanship and Social Media Influencer... Just wow❤',
    'Te amo cr7❤❤❤❤❤❤siuuuu',
    'نريد ميسي',
    '❤❤❤❤❤❤',
    'Pleez halmee sar hause nooo😊',
    'قن في الكره بين ميسي و رونالدو والٱن رونالدو.  وا مستر بيست وي يتري مين هيكون الافضل رونالدو ولا مستر بيست',
    'Have you ever been with ishowspeed',
    'Suerte',
    'Hii',
    'Hi Kateryna ❤️',
    'haz una colaboracion con Cuauhtémoc Blanco  pa´',
    'Esto es romper internet???? jajajajajajajajaja 😂😂😂😂😂😂😂',
    'ThePlanetofcrimesAapka apna channel 🙏❤️',
    'I love cr7❤❤❤🙏🙏🇳🇵🇳🇵🇳🇵',
    'Top baka',
    '💀imagine if speed was in that video💀',
    '❤❤❤😊',
    'Support from INDIA to goat 🐐 🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳🇮🇳',
    'Ronaldo What can I do for each to yor level💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯',
    'I’m like your top fan I really want tooooooo meat you I’m in Millcreek  Kenwood street',
    'We Need Messi Next',
    'Next Invite Me 😂',
    'Please invite next virat kohli 😢',
    'السلام عليكم ورحمة الله',
    'Essa é a voz do Cris kkkk',
    'Cristiano ronaldo please invite messi .Suuuuuuuuuuuubscribe',
    'See a ad comes but THE AD IS ABOUT RONALDO',
    'Assalam walekum Ronaldo I am your big fan your big fan you are so you are so good football footballer player good good Cristiano Ronaldo and allah Hafiz in inshallah mulakat',
    'I just found a Ronaldo ad',
    "I don't like Ronaldo he old.",
    'Brazilian',
    'Роналду я хотел тебя что-то сказать знаешь кого я люблю мыть Роналду Конечно я тебя и фотограф сделал',
    'Please hindi audio',
    'subtitle Indonesia please',
    '😃',
    '❤I swear to God, I love you, Cristiano, my brother. I love you, I adore you to death, my dear brother',
    'Can you voice Hindi',
    '🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴🇸🇴',
    'RONALDO What can i do reach to your level💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯💯💯💖💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊✊💯💯💯💯💯💯💯💯please cristiano answer to my question❤❤❤❤💯💯💯💯💯💯💯💯💯💯💯✊✊✊✊✊✊✊✊✊✊💯✊💯✊💯✊💯✊✊💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯🤩🤩💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯💯',
    'Ronaldo me mandas un saludo',
    'Who are all came here that Mr beast is seeing thala for a reason',
    'Next invite me',
    'Carry on Ronaldo channel 11:19',
    '😊 Ronaldo and mrbeast good but mrbeast help others and and Ronaldo to mrbeast give house to poor family',
    '🫴❤️👈',
    'Today is my birthday, 😢🎉 but I have 0 followers 😢',
    'Help ronaldo beat mr beast sub to ronaldo',
    'Impressão minha mas cr7 entediado? A linguagem corporal parece ser isso. Cr7 é um nível muito elevado de conversas,  nesse meio de YouTube ele é um peixe fora da água.',
    'Speed',
    'The ad was cr7 bet😂',
    'Ronaldo can u be the number 1 to become  my first subsciber 😅😅....please 😊',
    "Ronaldo I am big fan of Pakistan really really really really really really really really you are a great footballer and your son play good I don't know how to play football but you are the champion",
    'Legends foot ball & you tube 🔥',
    'I was expecting Messi but the Beast is great too.',
    'IMAGINA O: MR BEAST, O CR7 E O RUYTER JUNTO',
    'Türkiye',
    'كريستيانو رونالدو ❤❤❤ ولكن ميسي افضل',
    'Ronaldo + Speed + Messi = WWE Championship',
    'Cr zithuuuuuuuuu',
    'Siuuuu the celebrity of celebrities 🙌🏼😎',
    'Mr Beast said the f word 2:20',
    'Can we have 100M before gta 6??',
    'Plij invite ❤ next gest Sunil chetri 😊 🇮🇳',
    'Got messi',
    'كريستيانو رونالدو ❤❤ولكن ميسي افضل',
    'vuelve al Madrid Cristiano te necesitamos para tu sexta champions 😢',
    'You are the goat Cristiano',
    '❤️❤️😍',
    'Ronaldo The goat',
    'me pareció simpático el doblaje que le ponen a cada uno',
    'subscribe❤❤❤',
    'plese next guest speed ❤❤❤❤❤❤❤❤😊😊😊😊😊😊😊',
    'Cristiano Ronaldo',
    'last collab we expected 🥶',
    'nice❤❤',
    'Come to  fener bahçe  suiiii ronaldo goat🐐🐐🐐🐐',
    '🇸🇴🇸🇴🇸🇴  asad hagio invit he is the famous of YouTube',
    'RONALD ❤',
    'Invite messi cr7',
    '🙊🙉💋🐐🐐🐐🐐🐐🐐',
    'RONALD ❤',
    '🇺🇿🇺🇿🇺🇿',
    'Think Ronaldo needs to sack his cringey editor',
    'FINAL Kyiv 2018 😢😢',
    'siuuuuuuuuuuuuu',
    'Because he is busy',
    'Think if Mr Beast has Ronaldo in his video for a challenge, that is if Ronaldo has time',
    'Invite Ronaldo jr Manet the best one out of all❤❤',
    'جیمی من ایرانی هستم بیای ایران چی ها😂😂😂',
    'Oi Cristiano',
    'siuuuuuuuuuuuuuuuuuuuuu',
    'siuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
    'Ronaldo    perdón   que   lo  diga  pero   soy  de  argentina  y  quiero  más  a  Messi   y  menos   a  vos  pero   son  los  dos   buenos',
    'siuuu',
    'Messi is the better than ronaldo',
    'World Cup...?',
    'Please invite Messi next guest'
  ])

module.exports = { getSentiment };
  