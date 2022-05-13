// // Doug: helper functoin to get text of selection
// /**
//  * Helper function to get the text of the selected cells.
//  * @return {CardService.Card} The selected text.
//  */
//  function getSheetsSelection(e) {
//   var text = '';
//   var ranges = SpreadsheetApp.getActive().getSelection().getActiveRangeList().getRanges();
//   for (var i = 0; i < ranges.length; i++) {
//     const range = ranges[i];
//     const numRows = range.getNumRows();
//     const numCols = range.getNumColumns();
//     for (let i = 1; i <= numCols; i++) {
//       for (let j = 1; j <= numRows; j++) {
//         const cell = range.getCell(j, i);
//         if (cell.getValue()) {
//           text += cell.getValue() + '\n';
//         }
//       }
//     }
//   }
//   if (text !== '') {
//     var originLanguage = e.formInput.origin;
//     var destinationLanguage = e.formInput.destination;
//     var translation = LanguageApp.translate(text, e.formInput.origin, e.formInput.destination);
//     return createSelectionCard(e, originLanguage, destinationLanguage, text, translation);
//   }
// }

// Dug: Helper function to get Classroom stuff
function findCourseAndOwner() {

  var ranges = SpreadsheetApp.getActive().getSelection().getActiveRangeList().getRanges();
  console.log(ranges)

  // const courseList = Classroom.Courses.list().courses;
  // const courseData = courseList.map(course => {
  //     let ownerName = Classroom
  //                 .Courses
  //                 .Teachers
  //                 .get(course.id, course.ownerId)
  //                 .profile
  //                 .name
  //                 .fullName
  //                 console.log(course.id, course.name)

  //     return `${course.name} : ${course.id} : ${ownerName}`;
  // });

  return ranges;
};

export const createCatCard = (text: string, isHomepage?: boolean) => {
  // Explicitly set the value of isHomepage as false if null or undefined.
  if (!isHomepage) isHomepage = false

  let cardHeader1 = CardService.newCardHeader()
        .setTitle('Card header')
        .setSubtitle('Subheader')
        .setImageUrl(
            'https://source.unsplash.com/featured/320x180?nature&sig=8')
        .setImageStyle(CardService.ImageStyle.CIRCLE);

  let cardSection1SelectionInput1Action1 = CardService.newAction()
        // .setFunctionName('TODO')
        // .addParameters({});

    let cardSection1SelectionInput1 = CardService.newSelectionInput()
        .setFieldName('select1')
        .setTitle('Choose Classes to Pew Pew')
        .setType(CardService.SelectionInputType.CHECK_BOX)
        .addItem('Film', '1', false)
        .addItem('Science', '2', false)
        .addItem('Meaning of Life', '3', false)
        .setOnChangeAction(cardSection1SelectionInput1Action1);

    let cardSection1Divider1 = CardService.newDivider();

    let cardSection1TextInput1 = CardService.newTextInput()
        .setFieldName('fieldName')
        .setTitle('Emails + Grades')
        .setHint('Select Cells to Load')
        .setMultiline(false);

    let cardSection1ButtonList1Button1Action1 = CardService.newAction()
        // .setFunctionName('TODO')
        // .addParameters({});

    var action = CardService.newAction().setFunctionName('notificationCallback');
    // CardService.newTextButton().setText('Create notification').setOnClickAction(action);

    let cardSection1ButtonList1Button1 = CardService.newTextButton()
        .setText('Shoot to Classroom!')
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(action);

    let cardSection1ButtonList1 = CardService.newButtonSet()
        .addButton(cardSection1ButtonList1Button1);

    let cardSection1 = CardService.newCardSection()
        .setHeader('Configuration')
        .setCollapsible(true)
        .addWidget(cardSection1SelectionInput1)
        .addWidget(cardSection1Divider1)
        .addWidget(cardSection1TextInput1)
        .addWidget(cardSection1ButtonList1);

    let card = CardService.newCardBuilder()
        .setHeader(cardHeader1)
        .setDisplayStyle(CardService.DisplayStyle.PEEK)
        .addSection(cardSection1)
        .build();
    return card;

  // return card.build()
}

export const notificationCallback = ({}) => {
  return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
          .setText("Some info to display to user"))
      .build();
}

export const onChangeCat = (e: { parameters: { text: any; isHomepage: string } }) => {
  console.log(e)
  const text = e.parameters.text
  const isHomepage = e.parameters.isHomepage === "true"
  const card = createCatCard(text, isHomepage)
  const navigation = CardService.newNavigation().updateCard(card)
  const actionResponse = CardService.newActionResponseBuilder().setNavigation(navigation)
  return actionResponse.build()
}
