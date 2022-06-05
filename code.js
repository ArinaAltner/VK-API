function myFunction(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainsheet = ss.getSheetByName("MAIN");
  var token = YOUR_TOKEN

  var URL_STRING = "https://api.vk.com/method/photos.get?owner_id=-202699776&album_id=wall&rev=1&access_token=" + token + "&v=5.131";
  var response = UrlFetchApp.fetch(URL_STRING);
  var json = response.getContentText();
  var data = JSON.parse(json);
  mainsheet.getRange('A1:C10').clear();
  mainsheet.getRange(1,1).setValue("id")
  mainsheet.getRange(1,2).setValue("date")
  mainsheet.getRange(1,3).setValue("pic")
  for (var i = 0; i < 3; i++)
  {
    //var date = new Date('1302712950')
    var date = new Date(data.response.items[i].date * 1000);
    var pictureURL = null
    for (var j = 0; j < data.response.items[i].sizes.length; j++){
      if (data.response.items[i].sizes[j].type == "p"){
        pictureURL = data.response.items[i].sizes[j].url
      }
    }
    //var pictureURL = data.response.items[i].sizes[0].url;
    mainsheet.setRowHeight(2+i,300)
    mainsheet.setColumnWidth(3,250)
    //pictureURL = pictureURL + "portrait_medium.jpg";
    mainsheet.getRange(2+i,1).setValue(1+i).setVerticalAlignment("top")
    mainsheet.getRange(2+i,2).setValue(date).setVerticalAlignment("top");
    mainsheet.insertImage(pictureURL,3, 2+i)
    //mainsheet.getRange(2+i, 2).setValue()
  }


  
}
