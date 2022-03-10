// create new document/file
if (!app.homeScreenVisible) {
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

// main code
var docPreset = new DocumentPreset();
docPreset.width = 1000;
docPreset.height = 4000;
docPreset.units = RulerUnits.Millimeters;
docPreset.artboardLayout = DocumentArtboardLayout.GridByCol;
docPreset.numArtboards = 1;
var myDocument = app.documents.addDocument(DocumentColorSpace.CMYK, docPreset);
myDocument.layers[0].name = "Background Layer";
var layerTwo = myDocument.layers.add();
layerTwo.name = "Label Layer";
var layerThree = myDocument.layers.add();
layerThree.name = "Text Layer";

// parameters
var qty = 300;

// loop to create labels
for (var i = 200; i < qty; i++) {
  // create rectangle
  generateLabel(i);

  // create text
  generateText(i);

  // import QR from file
  importQR(i);
}

function generateText(i) {
  var doc = app.activeDocument;
  var textFrame = doc.textFrames.add();
  textFrame.name = "Test Text Frame";
  // .contents to change text
  // first build the serial number, need to have right number of digits
  var realSerial = i + 1;
  var serialVal = ("00000" + realSerial).slice(-5);
  textFrame.contents = "SATFF020" + serialVal;
  var textRange = textFrame.textRange;
  textRange.size = 5.0;
  textRange.justification = Justification.CENTER;
  if (i < 100) {
    textFrame.position = [103, 92 + i * 30];
  } else if (100 < i < 200) {
    textFrame.position = [203, 92 + i * 30 - 3000];
  } else if (200 < i < 300) {
    textFrame.position = [303, 92 + i * 30 - 6000];
  } else if (300 < i < 400) {
    textFrame.position = [403, 92 + i * 30 - 9000];
  } else if (400 < i < 500) {
    textFrame.position = [503, 92 + i * 30 - 12000];
  }
}

function generateLabel(i) {
  var doc = app.activeDocument;
  if (i < 100) {
    var rect = doc.pathItems.roundedRectangle(
      100 + i * 30,
      100,
      20.8 / 0.3527,
      7.8 / 0.3527,
      1,
      1
    );
  } else if (100 < i < 200) {
    var rect = doc.pathItems.roundedRectangle(
      100 + i * 30 - 3000,
      200,
      20.8 / 0.3527,
      7.8 / 0.3527,
      1,
      1
    );
  } else if (200 < i < 300) {
    var rect = doc.pathItems.roundedRectangle(
      100 + i * 30 - 6000,
      300,
      20.8 / 0.3527,
      7.8 / 0.3527,
      1,
      1
    );
  } else if (300 < i < 400) {
    var rect = doc.pathItems.roundedRectangle(
      100 + i * 30 - 9000,
      400,
      20.8 / 0.3527,
      7.8 / 0.3527,
      1,
      1
    );
  } else if (400 < i < 500) {
    var rect = doc.pathItems.roundedRectangle(
      100 + i * 30 - 12000,
      500,
      20.8 / 0.3527,
      7.8 / 0.3527,
      1,
      1
    );
  }
  rect.strokeColor = makeColor(75, 0, 100, 0);
  rect.strokeWidth = 0.5;
}

function importQR(i) {
  var doc = app.activeDocument;
  //   var newLayer = doc.layers.add();
  //   newLayer.name = "QR Layer";
  var imagePlacedItem = doc.placedItems.add();
  var realSerial = i + 1;
  var serialVal = ("00000" + realSerial).slice(-5);
  var fileName = "SAT-FF-020-" + serialVal;
  imagePlacedItem.file = File(
    "~/Documents/Programming/Illustrator/ai-basic-script/QR/" +
      fileName +
      ".eps"
  );
  imagePlacedItem.resize(22.5, 22.5);
  if (i < 100) {
    imagePlacedItem.position = [137, 99.5 + i * 30];
  } else if (100 < i < 200) {
    imagePlacedItem.position = [237, 99.5 + i * 30 - 3000];
  } else if (200 < i < 300) {
    imagePlacedItem.position = [337, 99.5 + i * 30 - 6000];
  } else if (300 < i < 400) {
    imagePlacedItem.position = [437, 99.5 + i * 30 - 9000];
  } else if (400 < i < 500) {
    imagePlacedItem.position = [537, 99.5 + i * 30 - 12000];
  }
}

function makeColor(c, m, y, k) {
  var color = new CMYKColor();
  color.cyan = c;
  color.magenta = m;
  color.yellow = y;
  color.black = k;
  return color;
}
