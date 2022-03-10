// create new document/file
if(!app.homeScreenVisible) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }

    // main code
    var docPreset = new DocumentPreset; 
    docPreset.width = 600; 
    docPreset.height = 500; 
    docPreset.units = RulerUnits.Millimeters; 
    docPreset.artboardLayout = DocumentArtboardLayout.GridByCol; 
    docPreset.numArtboards = 1 
    var myDocument = app.documents.addDocument(DocumentColorSpace.CMYK, docPreset);


    // var myDocument = app.documents.add();
    myDocument.layers[0].name = "Background Layer";

    // create solid coloured bg
    // generateBackground();

    // create a layer for a triangle with just stroke
    var layerTwo = myDocument.layers.add();
    layerTwo.name = "Label Layer";
    generateLabel();

    // create a new layer for the text
    var layerThree = myDocument.layers.add();
    layerThree.name = "Text Layer";
    generateText("SATFF020001");

    // save out png file of automated creation
    // myDocument.exportFile(File("~/Documents/test.png"), ExportType.PNG24);
    

function generateBackground() {
        var doc = app.activeDocument;
        var background = doc.pathItems.add();
        background.filled = true;
        var bgFillColour = new CMYKColor();
        bgFillColour.cyan = 4;
        bgFillColour.magenta = 2;
        bgFillColour.yellow = 97;
        bgFillColour.black = 1;
        background.fillColor = bgFillColour;
        background.setEntirePath([[0, 0], [doc.width, 0], [doc.width, doc.height], [0, doc.height]]);
    }

function generateText(text) {
        var doc = app.activeDocument;
        var textFrame = doc.textFrames.add();
        textFrame.name = "Test Text Frame";
        // .contents to change text
        textFrame.contents = text;
        var textRange = textFrame.textRange;
        textRange.size = 36;
        textRange.justification = Justification.CENTER;
        textFrame.position = [50, 100];
    }

function generateLabel() {
        var doc = app.activeDocument;
        var rectangle = doc.pathItems.add();
        rectangle.stroked = true;
        rectangle.setEntirePath([[10, 10], [10, 100], [250, 100], [250, 10], [10, 10]]);
    }