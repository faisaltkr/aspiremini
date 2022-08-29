const fs = require("fs");

module.exports.random = async (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}


module.exports.get_time_difference = async ( earlierDate, laterDate ) =>
  {
      var oDiff = new Object();
  
      //  Calculate Differences
      //  -------------------------------------------------------------------  //
      var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
  
      oDiff.days = Math.floor(nTotalDiff / 1000 / 60 / 60 / 24);
      nTotalDiff -= oDiff.days * 1000 * 60 * 60 * 24;
  
      oDiff.hours = Math.floor(nTotalDiff / 1000 / 60 / 60);
      nTotalDiff -= oDiff.hours * 1000 * 60 * 60;
  
      oDiff.minutes = Math.floor(nTotalDiff / 1000 / 60);
      nTotalDiff -= oDiff.minutes * 1000 * 60;
  
      oDiff.seconds = Math.floor(nTotalDiff / 1000);
      //  -------------------------------------------------------------------  //
  
      //  Format Duration
      //  -------------------------------------------------------------------  //
      //  Format Hours
      var hourtext = '00';
      if (oDiff.days > 0){ hourtext = String(oDiff.days);}
      if (hourtext.length == 1){hourtext = '0' + hourtext};
  
      //  Format Minutes
      var mintext = '00';
      if (oDiff.minutes > 0){ mintext = String(oDiff.minutes);}
      if (mintext.length == 1) { mintext = '0' + mintext };
  
      //  Format Seconds
      var sectext = '00';
      if (oDiff.seconds > 0) { sectext = String(oDiff.seconds); }
      if (sectext.length == 1) { sectext = '0' + sectext };
  
      //  Set Duration
      var sDuration =  mintext + ':' + sectext;
      oDiff.duration = sDuration;
      //  -------------------------------------------------------------------  //
  
      return oDiff;
  }

  module.exports.convertFromStringToDate = async (responseDate) => {
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],timePieces[0], timePieces[1], timePieces[2]))
}

module.exports.generateOtp = async (n)=> {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return generate(max) + generate(n - max);
    }

    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add); 
}

function makeRandom(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }