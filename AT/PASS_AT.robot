*** Settings ***
Library           Selenium2Library

*** Variables ***
${homeworkName}    1234

*** Test Cases ***
成功新增作業(CMS-TC02)
    [Setup]    teacherLogin
    click element    id=Software Engineering
    click element    id=createHW
    input text    id=InputhomeworkName    ${homeworkName}
    ${dueDate}=    get value    id=InputDueDateInAddHW
    input text    id=InputhwPercentage    10
    input text    id=InputhwFileExtension    txt
    input text    name=homeworkDescription    test
    click button    id=addHw
    element text should be    id=${homeworkName}    ${homeworkName}
    element text should be    id=HW${homeworkName}_dueDate    ${dueDate}
    element text should be    id=HW${homeworkName}_percentage    10
    element text should be    id=HW${homeworkName}_fileExtension    txt
    element text should be    id=HW${homeworkName}_homeworkDescription    test
    element text should be    id=HW${homeworkName}_dueDateExtension    不可補交
    [Teardown]    Run Keywords    click element    id=delete_${homeworkName}
    ...    AND    close browser

新增作業內容為空(CMS-TC03)
    [Setup]    teacherLogin
    click element    id=Software Engineering
    click element    id=createHW
    clear element text    id=InputDueDateInAddHW
    click button    id=addHw
    ${testHomeworkName}=    Execute JavaScript    return window.document.getElementById("InputhomeworkName").getAttribute("oninvalid").split("'")[1]
    should be equal    ${testHomeworkName}    請填寫這個欄位
    input text    id=InputhomeworkName    ${homeworkName}
    ${testDueDate}=    Execute JavaScript    return window.document.getElementById("InputDueDateInAddHW").getAttribute("oninvalid").split("'")[1]
    should be equal    ${testDueDate}    日期格式錯誤
    [Teardown]    close browser

成功編輯作業(CMS-TC04)
    [Setup]    addHW
    teacherLogin
    Click Element    id=Software Engineering
    click element    id=edit_${homeworkName}
    input text    name=dueDate    12/13/2018 5:36 PM
    input text    name=homeworkDescription    Description is changed!!!
    click element    id=dueDateExtension
    click button    id=submitInEditHW
    element text should be    id=HW${homeworkName}_dueDate    12/13/2018 5:36 PM
    element text should be    id=HW${homeworkName}_percentage    100%
    element text should be    id=HW${homeworkName}_fileExtension    txt
    element text should be    id=HW${homeworkName}_homeworkDescription    Description is changed!!!
    element text should be     id=HW${homeworkName}_dueDateExtension    不可補交
    [Teardown]    Run Keywords    click element    id=delete_${homeworkName}
    ...    AND    close browser

編輯作業但欄位為空(CMS-TC05)
    [Setup]    addHW
    teacherLogin
    Click Element    id=Software Engineering
    click element    id=edit_${homeworkName}
    clear element text    name=homeworkName
    clear element text    name=dueDate
    clear element text    name=percentage
    clear element text    name=fileExtension
    clear element text    name=homeworkDescription
    click button    id=submitInEditHW
    ${testHomeworkName}=    Execute JavaScript    return window.document.getElementById("InputhomeworkName").getAttribute("oninvalid").split("'")[1]
    should be equal    ${testHomeworkName}    請填寫這個欄位
    input text     name=homeworkName    ${homeworkName}
    ${testDueDate}=    Execute JavaScript    return window.document.getElementById("InputDueDate").getAttribute("oninvalid").split("'")[1]
    should be equal    ${testDueDate}    日期格式錯誤
    [Teardown]    Run Keywords    go back
    ...    AND    click element    id=delete_${homeworkName}
    ...    AND    close browser

成功刪除作業(CMS-TC06)
    [Setup]    addHw
    teacherLogin
    Click Element    id=Software Engineering
    click element    id=delete_${homeworkName}
    element should not be visible    id=${homeworkName}
    element should not be visible    id=HW${homeworkName}_dueDate
    element should not be visible    id=HW${homeworkName}_percentage
    element should not be visible    id=HW${homeworkName}_fileExtension
    element should not be visible    id=HW${homeworkName}_homeworkDescription
    element should not be visible    id=HW${homeworkName}_dueDateExtension
    [Teardown]    close browser

使用者登入成功(UAMS-TC01)
    [Setup]
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    click element    id = signin
    Element Should Be Visible    id = Login
    input text    name = studentID    105598001
    input password    name = password    1209
    click button    id = Login
    element Should Be Visible    id = jumbotron
    [Teardown]    close browser

使用者登入失敗(UAMS-TC02)
    [Setup]
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    set selenium speed    0.5s
    click element    id = signin
    Element Should Be Visible    id = Login
    input text    name = studentID    105598001
    input password    name = password    127
    click button    id = Login
    Wait Until Element Is Visible    id = danger-alert    3s
    Element Text Should Be    id = danger-alert    x\ninvalid account
    [Teardown]    close browser

老師/TA只能使用自身權限所及的功能(UAMS-TC03)
    [Setup]
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    click element    id = signin
    Element Should Be Visible    id = Login
    input text    name = studentID    105598001
    input password    name = password    1209
    click button    id = Login
    Wait Until Element Is Visible    id = jumbotron    3s
    Element Text Should Be    id = jumbotron    Course\nThis is a simple hero
    element Should Be Visible    id \ = \ course
    element Should Be Visible    id = gradesReport
    [Teardown]    close browser

學生只能使用自身權限所及的功能(UAMS-TC04)
    [Setup]
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    click element    id = signin
    wait until element is visible    id = Login    3s
    input text    name = studentID    105598002
    input password    name = password    1209
    click button    id = Login
    Wait Until Element Is Visible    class \ = \ jumbotron    3s
    Element Text Should Be    class \ = \ jumbotron    105598002學生作業繳交區
    element Should Be Visible    id \ = onlineClassroom
    [Teardown]    close browser

使用者登出成功(UAMS-TC05)
    [Setup]
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    click element    id = signin
    Element Should Be Visible    id = Login
    input text    name = studentID    105598001
    input password    name = password    1209
    click button    id = Login
    Wait Until Element Is Visible    id = \ logout    2s
    Element Text Should Be    id = \ logout    Logout
    click element    id = logout
    Element Should Be Visible    id = Login
    [Teardown]    close browser

老師/TA的產生作業成績報表功能(RGS-TC01)
    [Setup]    addHW
    teacherLogin
    click element    id = gradesReport
    click element    xpath = //*[@id="selectedHomework0"]/option[2]
    ${selectedHomeworkName}=    Get Text    xpath = //*[@id="selectedHomework0"]/option[2]
    click element    id = SubmitBtn
    Element Should Be Visible    class = t1
    Element Should Be Visible    id = piechart
    ${reportHomeworkName}=    Get Text    id=${homeworkName} report
    Should Contain    ${reportHomeworkName}    ${selectedHomeworkName}
    [Teardown]    Run Keywords    close browser    deleteHW

老師/TA的產生作業成績報表功能時未選擇作業(RGS-TC02)
    [Setup]    addHW
    teacherLogin
    click element    id = gradesReport
    click element    id = SubmitBtn
    Wait Until Element Is Visible    id = danger-alert    3s
    Element Text Should Be    id = danger-alert    you have not choice
    [Teardown]    Run Keywords    close browser    deleteHW

*** Keywords ***
teacherLogin
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    set selenium speed    0.5s
    click element    id=signin
    wait until element is visible    id=Login    3s
    input text    name=studentID    105598001
    input password    name=password    1209
    click button    id=Login

studentLogin
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    set selenium speed    0.5s
    click element    id=signin
    wait until element is visible    id=Login    3s
    input text    name=studentID    105598002
    input password    name=password    1209
    click button    id=Login

go to login page
    Open Browser    http://localhost:3000/    chrome
    maximize browser window
    set selenium speed    0.5s
    click element    id=signin
    wait until element is visible    id=Login    3s

addHW
    teacherLogin
    click element    id=Software Engineering
    click element    id=createHW
    Wait Until Element Is Visible    id = lineModalLabel
    input text    id=InputhomeworkName    ${homeworkName}
    input text    id=InputDueDateInAddHW    01/20/2018 0:00 AM
    input text    id=InputhwPercentage    100%
    input text    id=InputhwFileExtension    txt
    input text    name=homeworkDescription    Create Homework.
    click element    id = dueDateExtension
    click button    id=addHw
    close browser

deleteHW
    teacherLogin
    Click Element    id=Software Engineering
    Click element    id = delete_${homeworkName}
    close browser
