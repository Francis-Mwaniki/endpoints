const express=require('express');
const app=express();
const axios = require('axios').default;
const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const port=process.env.PORT || 3000;
require('dotenv').config();
app.get('/',(req,res)=>{
    res.send('Hello World');
});
app.get('/api',async(req,res)=>{
    const options = {
      method: 'GET',
      url: 'https://referential.p.rapidapi.com/v1/city',
      params: {ip: '128.218.229.26'},
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'referential.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
        res.send(response.data);
        console.log(response.data);
    }).catch(function (error) {
        
        console.error(error);
        return res.status(500).json({msg:`Server Error ${error}`});
    });
});
app.get('/api/country',async(req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://referential.p.rapidapi.com/v1/country',
        params: {
          fields: 'currency,currency_num_code,currency_code,continent_code,currency,iso_a3,dial_code',
          limit: '250'
        },
        headers: {
          'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
          'X-RapidAPI-Host': 'referential.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
            res.send(response.data);
          console.log(response.data);
      }).catch(function (error) {
        return res.status(500).json({msg:`Server Error ${error}`});
          console.error(error);
      });
    });
    /* cities */
    app.get('/api/cities',async(req,res)=>{
        const options = {
            method: 'GET',
            url: 'https://referential.p.rapidapi.com/v1/city',
            params: {
              fields: 'iso_a2,state_code,state_hasc,timezone,timezone_offset',
              iso_a2: 'us',
              lang: 'en',
              state_code: 'US-CA',
              prefix: 'san fr',
              limit: '250'
            },
            headers: {
              'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
              'X-RapidAPI-Host': 'referential.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
                res.send(response.data);
              console.log(response.data);
          }).catch(function (error) {
            console.log(error);
            return res.status(500).json({msg:`Server Error ${error}`});
             
          });
        });
        /* states */
        app.get('/api/states',async(req,res)=>{
            const options = {
                method: 'GET',
                url: 'https://referential.p.rapidapi.com/v1/state',
                params: {fields: 'iso_a2', name: 'tex', iso_a2: 'us', lang: 'en', limit: '250'},
                headers: {
                  'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                  'X-RapidAPI-Host': 'referential.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                    res.send(response.data);
                  console.log(response.data);
              }).catch(function (error) {
                  console.error(error);
                    return res.status(500).json({msg:`Server Error ${error}`});
              });
            }
        );
        /* continents */
        app.get('/api/continents',async(req,res)=>{
            const options = {
                method: 'GET',
                url: 'https://referential.p.rapidapi.com/v1/continent',
                headers: {
                  'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                  'X-RapidAPI-Host': 'referential.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                    res.send(response.data);
                  console.log(response.data);

              }).catch(function (error) {

                  console.error(error);
                    return res.status(500).json({msg:`Server Error ${error}`});
              });
            })
            /* isocode */
            app.get('/api/isocode',async(req,res)=>{
                const options = {
                    method: 'GET',
                    url: 'https://referential.p.rapidapi.com/v1/country/US',
                    params: {lang: 'en'},
                    headers: {
                      'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                      'X-RapidAPI-Host': 'referential.p.rapidapi.com'
                    }
                  };
                  
                  axios.request(options).then(function (response) {
                        res.send(response.data);
                      console.log(response.data);
                  }).catch(function (error) {
                      console.error(error);
                        return res.status(500).json({msg:`Server Error ${error}`});
                  });
                })
app.listen(3000,()=>{
    console.log(`Server is running on port ${port}`);
}
);
