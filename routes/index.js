const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-VVHHvV40vuYUjazdaDHrZV0Z",     
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

var express = require('express');
const { json } = require("body-parser");
var router = express.Router();


// app.use('/mediaquery', indexRouter);
// app.use('/scrollbar', indexRouter);
// app.use('/fontsize', indexRouter);
// app.use('/paddingmargin', indexRouter);

// router.post('/mediaquery', async(req, res, next) => {
//   const jsonObject = JSON.parse("{}");
//   res.send(jsonObject);
// });

// router.post('/scrollbar', async(req, res, next) => {
//   const jsonObject = JSON.parse("{}");
//   res.send(jsonObject);
// });


// router.post('/fontsize', async(req, res, next) => {
//   const jsonObject = JSON.parse("{}");
//   res.send(jsonObject);
// });


// router.post('/paddingmargin', async(req, res, next) => {
//   const jsonObject = JSON.parse("{}");
//   res.send(jsonObject);
// });


/* POST home page. */
router.post('/', async(req, res, next) => {
  
  //console.log(req.body);

  promptstr = "you are an expert in mobile web develoment. ";
  promptstr += "Answer in bullet point how the following css can be improved for mobile friendliness. ";
  promptstr += "CSS Code:\"" + req.body.css.valueStr + "\"";
  promptstr += "and HTML Code: \"" + req.body.html.valueStr + "\""; 
  promptstr += ".";
  promptstr += "please Answer in a json format. The keys based on : ";
  promptstr += "please Answer in a array of json format. The array of json: [ Is Media Query for small device added?:{yes/no/NA:, recommendation:, code sample: }],[Correct Font Size used? :{yes/no/NA:, recommendation:, code sample: }], [Right padding margin border-radius used :{yes/no/NA:, recommendation:, code sample: }],[ hamburgar menu added:{yes/no/NA:, recommendation:, code sample: }],[ Scrollbar correctly used :{yes/no/NA:, recommendation:, code sample: } ],[ Mobile Friendliness :{yes/no/NA:, recommendation:, code sample: }]";
  
  console.log(promptstr);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: promptstr,
    temperature: 0,
    max_tokens: 200,
    top_p: 0.01,
    best_of: 2,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  
  const valueStr = response.data.choices[0].text.replace(/[\r\n]/gm, '');

  console.log("GOT SOME ANSWER");
  console.log(valueStr);
  const jsonObject = JSON.parse(valueStr);

  //console.log(response.data.choices[0].text);
  //console.log(response.data.choices[1].text);
  //res.render('index', { title: 'Express', data:response.data.choices[0].text });
  res.send(jsonObject);


});

module.exports = router;
