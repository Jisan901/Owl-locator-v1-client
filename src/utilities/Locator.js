class Locator {
    constructor(id, interval, bts, autoOptimize, timeout) {
        this.id = id;
        this.locationArray = [];
        this.multiData = {};
        this.locateInterval = interval*1000;
        this.batterySaver = bts;
        this.autoOptimize = autoOptimize;
        this.timeout = timeout*1000;
        this.oninterval = null;
        this.locateId="";
        this.onend = null;
        this.intervalId = null;
        this.timeoitId=null;
        this.locating=false;
        this.tracks = {
            
        }
        if ("geolocation" in navigator) {
            this.available = true;
        } else {
            throw new Error('geolocation IS NOT available');
        }
    }
    locate(id) {
        this.locateId=id
        if (!this.available) {
            return;
        }
        // don't use as callback on event or timeout and interval 
        this.locating=true
        let locator = this; // we can't use this directly in timeout or interval
        if (locator.batterySaver) {
                const iId = setInterval(function() {
                window.navigator.geolocation.getCurrentPosition((position) => {
                    locator.locationArray.push([position.coords.latitude, position.coords.longitude]);
                    if (locator.oninterval) {
                        locator.oninterval({
                            message:"success",
                            code:1,
                            position:position
                        });
                    }
                },()=>{},{
                    enableHighAccuracy: true,
                });
            }, this.locateInterval);
            locator.intervalId=iId;
        }
        else{
            const wId = window.navigator.geolocation.watchPosition((position)=>{
                locator.locationArray.push([position.coords.latitude, position.coords.longitude]);
                if (locator.oninterval) {
                    locator.oninterval({
                        message:"success",
                        code:1,
                        position:position
                    });
                }
            },(err)=>{
                console.error(err);
            },{
                enableHighAccuracy: true,
            })
            locator.watchId = wId;
        }
        
        // if timeout is found clear by time out and if onend available call onend({})
        if (this.timeout) {
            const tId = setTimeout(function() {
                // batterySaver can give you worng location
                locator.stop()
                // if (locator.batterySaver) {
                //     clearInterval(locator.intervalId);
                //     clearTimeout(tId);
                //     locator.multiData[id]=locator.locationArray;
                //     if (locator.onend) {
                //         locator.onend({
                //             message:"timeout",
                //             code:1
                //         });
                //     }
                // }
                // // not for batterySaver
                // else{
                //     window.navigator.geolocation.clearWatch(locator.watchId)
                //     clearTimeout(tId);
                //     locator.multiData[id]=locator.locationArray;
                //     if (locator.onend) {
                //         locator.onend({
                //             message:"timeout",
                //             code:1
                //         });
                //     }
                // }
            }, this.timeout);
            locator.timeoitId=tId;
        }
    }
    
    stop(){
        this.locating=false
        if (this.batterySaver) {
            
        this.multiData[this.locateId]=this.locationArray;
        clearInterval(this.intervalId)
        clearTimeout(this.timeoitId)
        if (this.onend) {
            this.onend({
                message:"timeout",
                code:1
            });
        }
        }
        else{
        this.multiData[this.locateId]=this.locationArray;
        window.navigator.geolocation.clearWatch(this.watchId)
        clearTimeout(this.timeoitId)
        if (this.onend) {
            this.onend({
                message:"timeout",
                code:1
            });
        }
        }
        
    }
    
    getById(id){
        return {
            data:this.multiData[id],
            id:id,
            code:1
        }
    }
    
    getCurrentPosition(callback){
        window.navigator.geolocation.getCurrentPosition((position) => {
                callback([position.coords.latitude, position.coords.longitude]);
        },(err)=>{
                console.error(err);
            },{
                enableHighAccuracy: true,
            });
    }
    
    
    sentTracksByApi(api,header,callback){
        let locator = this;
        fetch(api,{
            method:"POST",
            headers:{
                'Content-type': 'application/json',
                Authorization:header
            },
            body:JSON.stringify(locator.multiData)
        })
        .then(res=>res.json())
        .then(data=>callback(data))
    }
    
    requestPermission(){
        // click event type only
        //some.onclick = requestPermission;    
        navigator.permissions.query({ name: "geolocation" });
    }
}



export default Locator;