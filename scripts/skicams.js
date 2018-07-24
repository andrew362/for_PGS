(function () {

    const url = 'https://makevoid-skicams.p.mashape.com/cams.json';
    const apiKey = 'kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw';
    let camImage1 = document.getElementById('cam1');
    let camImage2 = document.getElementById('cam2');
    let camImage3 = document.getElementById('cam3');
    let camImage4 = document.getElementById('cam4');
    let title1 = document.getElementById('card-first-title');
    let title2 = document.getElementById('card-second-title');
    let timeStamp = document.querySelectorAll('.time');

    function getCurrentTime() {
        let d = new Date();
        let dd = d.getDate();
        let mm = d.getMonth() + 1;
        let yyyy = d.getFullYear();
        let currentTime = [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, yyyy].join('-');
        [...timeStamp].forEach(t => t.textContent = currentTime);
    }

    function getData(data) {
        //  there was no camera image for Andalo and Monte Bondone!!! --> changed to Alpe Lusia and Alpe di Siusi
        const cams = {
            first: {
                title: data['9'].name,
                cams: {
                    c1: data['9'].cams['41'].url,
                    c2: data['9'].cams['42'].url
                }
            },
            second: {
                title: data['31'].name,
                cams: {
                    c1: data['31'].cams['121'].url,
                    c2: data['31'].cams['122'].url
                }
            }
        };

        title1.textContent = cams.first.title;
        camImage1.style.background = `url('${cams.first.cams.c1}')`;
        camImage2.style.background = `url('${cams.first.cams.c2}')`;

        title2.textContent = cams.second.title;
        camImage3.style.background = `url('${cams.second.cams.c1}')`;
        camImage4.style.background = `url('${cams.second.cams.c2}')`;
    }

    fetch(url, {
            method: 'get',
            headers: {
                'X-Mashape-Key': apiKey,
                "Accept": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(res)
            }
        })
        .then(data => {
            getCurrentTime();
            getData(data);
        })
        .catch(function (err) {
            console.error('Coś poszło nie tak', err.statusText, err);
        });


    
})();