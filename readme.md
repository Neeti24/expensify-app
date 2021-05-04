*******************React Router*******************

--> learn more - react router(GitHub) - reacttraining.com/react-router - web 

-->React Router - React Router is a collection of navigational components that compose declaratively with your application.
                 and it is a tool that can be use in a few different envoirment.
                 * native - for adroid and ios
                 * web - for web application

-->install react router liabary :
        *react-router itself include all of the code to work with both natively and in the web.
            if you just working with native use "react-router-native"
            or working with web app use "react-router-dom" - it include react router setup for web app
    ->yarn add react-router-dom@4.2.2

-->import the react router in app.js :
    -> import {BrowserRouter, Route} from 'react-router-dom';
        * BrowserRouter - it use only one to create the new router
        * Route - it use for every single page. We going to provide things to Route like the path we want to match for and what we want 
                    to do when user visit that path?
        * Route prop :
                - path - It specify the url you want to use for this route.
                - components - when is match the url what it shows on the screen.It show the component.
        *when you want to render something on the screen use pranthies not curly braces.

    ->const ExpenseDashboardPage = () => (
                                <div>
                                    This is from expense dashboard component.
                                </div>
                            )

    ->const addExpensePage = () => (
                            <div>
                                This is from add expense component.
                            </div>
                        )

    ->const routes = (
            <BrowserRouter>    //it ia instance of BrowserRouter and inside of it we are going add some children
                <div>   // because the length of BrowserRouter has to 1 
                    <Route path="/" compoennt={ExpenseDiashboardPage} />   
                    <Route path="/create" component={addExpensePage} />
                </div>
            </BrowserRouter>
        ); 
    ->ReactDOM.render(routes, document.getElementById('app'));

        * When you try to render this it will give error 404 page not found 
        * because it is using server side routing for the first page load.
        * browser needs to grape the insitial HTML and load the js before it can do anything before the react router code even run.
        * we need to configure the dev derver and send back "index.html" for all routes. 
        * All we need to provide a new attribute on to the devServer object(webpack.config.js)  

    ->historyApiFallback : true //in order to tell devServer always server the "index.html' for all routes

        *re-start the dev-server
        *we get all of the routes component showing on the same page
        *for this we se "exact" prop

    -><Route path="/" component={ExpenseDashboardPage} exact={true} /> //it will match the exact path

*******************404 page*******************

        *if someone visit that we do not have route for for example I go to /testing
        *it will not show any error in the console and we just not getting anything
        *React route runs throght the 4 routes looking for a match non of these routes match this URL 
         and at the end we just getting empty div which mean no content render to the screen.
        *We need to do two things :
            1, define new component that we don't specify else where.

    ->const NotFoundPage = () => (
                            <div>
                                404!
                            </div>
                        )
            
    -><Route component={NotFoundPage} />  //need to know that path is totaly optional

        *Result is NotFoundPage will be render on every single page for our app.
        *Because we remove th path react router always considers that a match 
           
            2, to solve this import the Switch property.
    
    ->import { BrowserRouter, Route, Switch } from 'react-router-dom';

        *How it work :
            -when react router see the Switch it's going to move through your route defination in order.
            -it will stop when it find the match and it will not look for other routes.
            -That means we see the NotFoundPage when not of the routes not match because without path routes always a path.

    ->  <BrowserRouter>
         <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpExpensePage} />
            <Route component={NotFoundPage} />
         </Switch>
       </BrowserRouter>

*******************Linking b/w Routes*******************

        *Right now we are changing the URL manually when we do that we go through the full page refresh.
        *and if you create achor tag for the route it will also going to refresh the whole page

    -> 404! <a href="/">GO HOME</a>

        *Still we are communicating with the server and the whole point of the client side routing is to avoid that  
        *we have to switch page without full page refresh
        *to get that done we have to to overwrite the default behaviour.
        *We going to say don't achually change pages we got her just pretend the link never click
        *we are going to import use "link" propertyfor client sside routing

    -> 404! <Link to="/">GO HOME</Link>
                   |
        *here we provide the link should go to

        *we going to use "link" inside our application anytime we are changing  page that we control.
        *if you are linking out side of your app like google search, some other external website URL.It's perfectly fine to use regular 
            anchor tag because your not getting the advantages of client side routing.
        *Exporing more let's create new component called Header.
        *So, the goal is to render Header not only any indivisual page but every single page including NotFoundPage. 

    ->const Header = () => {
                        <div>
                            <h1>Expensify</h1>
                        </div>
                    }
        *next we dump a instance of Header component in routes that will couse to show the header on every single page.
         but remember BrowserRouter need single root element so we tool a div.

    ->const routes = (
                <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" component={ExpenseDashboardPage} exact={true} />
                        <Route path="/create" component={AddExpensePage} />
                        <Route path="/edit" component={EditExpensePage} />
                        <Route path="/help" component={HelpExpensePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
                </BrowserRouter>
            );

        *there is another propert called "NavLink"
        *NavLink - import a special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL.

    ->import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

        *we also going to use two props of NavLink :
                1, activeClassName - The class to give the element when it is active. The default given class is active. This will be joined with the className prop.
                                        and used to custom style element.
                2, exact - When true, the active class/style will only be applied if the location is matched exactly.
                            because without it the NavLink is appliying the style on dashboard also as dashboard also match the path/location

    ->const Header = () => (
                    <header>
                        <h1>Expensify</h1>
                        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
                        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
                        <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink>
                        <NavLink to="/help" activeClassName="is-active">Help</NavLink>
                    </header>
                )

    ->.is-active {
            color : pink;
            }

        *organizing the Routes breaking them into their own file.
        *create new folder called routers inside a new file called AppRouter.js 

*******************Query Strings and URL Parameters*******************

        *not only react router rendering the components it also passing few prop to those components.
        *let's dump the prop in the console and how it useful - 
                -some changes in EditExpensePage :

    ->const EditExpensePage = (props) => {
                            console.log(props);
                            return  (
                                <div>
                                    This is from edit expense component.
                                </div>
                            )
                        };

        *head over to EditExpense in the browser
        *see the rect router passes into the compoennt in the console :
                1, History - this is an object and it contain bunch of property most of which are method these allow us to manuplate the
                                History. like- re-direct the user 
                2,Match - it contain information about URL.
                3,Location -  it contain current location/URL
            
        *let sat i want to edit cartain expense. So how we go that :
                -every expense will be have a unique id and we have to grape that id by route.
                -So route path for EditExpensePage will be edit/:id
                         -(:id) this is going to dynamicly match whatever comes after the forword slash. It could be any id or any string
                                 testing and it's ging to give access to that value. So we can do some meaningful like fetch the item 
                                 from database and populate the form field.So user can achually edit the expense.
                         -(edit/) this will be static

    -> <Route path="/edit/:id" component={EditExpensePage} />
    
        *Accessing the url parameter that achually sit inside the params which come under match object.
        *and we render that id on screen by using :

    ->const EditExpensePage = (props) => {
                            console.log(props);
                            return  (
                                <div>
                                    Edit the expense with id of {props.match.params.id};
                                </div>
                            )
                        };

        *if we we visit /edit which used to work but we are getting 404! for that. Becasue there is nothing after. There are no query 
         parameters
        *that exactly what we want we can't set the route edit page in the navigation.
        *so we remove the edit naviagation from header
        *react router pass the property to those component that achually used inside in a route 

******setting an object property by same name( incrementBy : incrementBy ) we can simplfy it ( incrementBy)


*****************Reducer********************************

        *Reducer : is a function which take  that take the current state and an action as arguments, and return a new state result. 
                    In other words,[ (state, action) => newState ]and Reducer function pass down to createStore.

        *Reducers must always follow some special rules:
                    *Reducer should be pure function
                    (no interaction/manuplating with global variable or you can say that output is not depending on global function).
                    *Never change/modify the existing state or action just read off of them.

        *combineReducers : is going to allow us to create multiple functions the define how our redux application changes.
                            so why we need this because previously(redux-101.js) we have very simple reducer.
                            but 'demoState' is very complex and we have :
        
        ->const demoState = {
                    expenses : [{
                        id : 'reweknw',
                        description: 'January Rent',
                        note : 'This was the final payment for that address',
                        amount : 5000,
                        createAt : 0,
                    }],
                    filers : {
                        text : 'rent',
                        sortBy : 'amount', //date or amount
                        startDate : undefined,
                        endDate : undefined
                    }
                };

                    *'expenses' which is the array of object 
                    *'filter' which is object with various property on it.

        *we need to create these action :
                *ADD_EXPENSE
                *REMOVE_EXPENSE
                *EDIT_EXPENSE
                *SET_TEXT_FILTER
                *SORT_BY_DATE
                *SORT_BY_AMOUNT
                *SET_START_DATE
                *SET_END_DATE   

        *handling all of them with just a single Reducer is not good.
        *we need to breakup application into multiple reducer

        *We need to create two reducer :
                    *one just handle this array 'expenses' as if 2nd one is not exist
                    *2nd one just handle this object 'filter as if 1st one is not exist
        ->const expensesReducer = (state = expensesReducerDefaultState, action) => {
                    switch (action.type) {
                        default :
                        return state;
                    }
                };

                const filtersReducer = (state = filtersReducerDefaultState, action) => {
                    switch (action.type) {
                        default : 
                        return state;
                    }
                };

        *we will take those tow reducer and combine them to create the complete store 
        *combineReducers also take argument and the argument will be object inside of it we provide key value pair.
                    *key - is going to be root state name 
                    *value - is going to be reducer which manage that 
        *our case :
                const store = createStore(
                    combineReducers({
                       (key) expenses : expensesReducer(value),
                        filers : filtersReducer
                    })
                );

        *uuid(universal uniqe identifier) to generate uniqe id:
        -> yarn add uuid@3.1.0 and import it.

*****************ES6 Spread Operator in Reducers***********************************

        *we need to create these action :
            *ADD_EXPENSE
                   //expen object will contain all of field we need to create new expense(id, description, note, amount, createAt).
                   //id will be autogenerated by uuid
                   //and the other value will come from the user as it pass in 
                   //we are going use same set up to destructure the value and setup default
                   //we going to destructure the first argument if it doesn't exist we will destructure an empty object.
                        ({first argument} = {empty object})
                   //then we can define all of thing we actually want to grab and setup the default value then all 
                    we have to do is attach them to 'expense' object
                                         |
                   ->const addExpense = ({description = '', note = '', amount = 0, createAt = 0} = {}) => ({
                            type : 'ADDEXPENSE',
                            expense : {
                                id : unid(),
                                description,
                                note,
                                amount,
                                createAt
                        });

                    //Now, the addExpense action generator completely setup we can go head and add an expense.
                    ->store.dispatch(addExpense({description : 'Rent', amount : 4000}));

                    //next add the case in expensesReducer:
                        PUSH() :
                            -we could use 'push()' to add new item in the expense.
                            -remember we can change the state or action in the Reducer
                            ->case 'ADDEXPENSE' :
                                    return state.push(action.expense);

                        CONCAT() :  
                            -So, we use concat to add new item in the expense.
                            -remember 'concat()' don't change the real array it just add the item and return the new array.
                            ->case 'ADDEXPENSE' :
                                    return state.concat(action.expense);

                    ==> SPREAD OPERATOR() with array :
                            -but we are going to use ES6 spread Operator which work more effectively then concat();
                            -Example :
                            ->numbers = [1, 2, 3, 4, 5]
                            ->[...numbers];
                                    |
                            //it says : as we create this new array i want to add all of the items from numbers here.
                            //if run this we get the array which match the previous one
                            //if I want to add new item after those numbers we can do this :
                            ->[...numbers, 6];
                            //if I want to add new item before those numbers we can do this :
                            ->[6, ...numbers, 7];
                        
                            //in our case :
                            ->case 'ADDEXPENSE' :
                                    return [
                                        ...state,
                                        action.expense
                                    ]

            *REMOVE_EXPENSE
                    //we are going to use filter function because we can bot change the state or action in Reducer.
                    //filter - it take a call back function and get called one time for every item but
                                it allow the filter to various item from an array and it return the brand new array with just filterd 
                                item.  
                                it doesn't change the array it hold and returns a new array with filter values.
                                if it return false if the item will remove 
                    ->  case 'REMOVE_EXPENSE' :
                                return state.filter(({ id }) => {
                                    //if the id is equal to acton.id return false and it remove that item and return new array with filter
                                    return id !== action.id;
                                });

        ==> SPREAD OPERATOR() with array :
                    *We need to customize our babel configuration in in order suppor spred operator for object.
                    *babel object spread operator - babeljs.io/plugin-trasform-spread 
                    *install : yarn add babel-plugin-transform-object-rest-spread@6.23.0
                    *next listed in the pluging array(.babelrc)
                      "transform-object-rest-spread"
                    *Example : 
                                const user = {
                                    name : 'Max',
                                    age : 20,
                                };

                                console.log({
                                    ...user
                                })
                    
                        -changing the age:
                                console.log({
                                    ...user,
                                    age : 24  //here we are overriding the age and the new age is 24
                                })
                            
                        - if age comes before spread operator:
                                console.log({
                                    age : 23  //age wiil be 20 because spread operator overriding age back to 20
                                    ...user,
                                })

            *EDIT_EXPENSE
                    //use the spread operator to edit the expense value which is provide by the user.
                    //two argument need pass to edit expense :
                    ->store.dispatch(editExpense( expenseTwo.expense.id, { amount : 500}));
                        1. id - which one expense we need to edit
                        2. updates - what we trying to edit

                    //next to generate editExpense action :
                    ->const editExpense = (id, updates) => ({
                                        type : 'EDIT_EXPENSE',
                                        id,
                                        updates
                                    });

                    //add case :
                    //map allow us to go throw every single item and use some conditional login to change just a one whoes id matches
                      action.id the one we actually trying to change
                    ->case 'EDIT_EXPENSE' : 
                                    return state.map((expense) => {
                                    if(expense.id === action.id) {
                                    return {  //i want to return a new object and changing expense i want to grabe all existing property
                                        ...expense,         i want to overriding any of the one that pass down that's going to be the new value for that expense.
                                        ...action.updates
                                    }
                                    } else {
                                        return expense;
                                    }
                                });
                 
        -->all we need to do is to grabe the default value which already we define or pass the value in the action.
            *SET_TEXT_FILTER
            *SORT_BY_DATE
            *SORT_BY_AMOUNT
            *SET_START_DATE
            *SET_END_DATE   

        -->If i save the 4 expenses in I always see the 4 expense in the console because we have two seperate pices of data.
            we have the "expenses" array and "filter" object but we are not using them together to determine what expenses should actually showing
            on the screen.
        -->we have to pass the data into a single function which is going to filter the data and sort data returning the visiable expenses

*********************Timestamps*************************************
       *startdata and endDate which are numbers and these are timestamps
       * it can be negative or positive value depanding 
       *it counting in miliseconds
       *miliseconds start on certain point of time 
       *postive number go forword in time from that point
       *negative number go backword in time 
       *what is the specific time spot and what does the timestamp 0 represent
       *january 1st 1970 (unix epoch) at mid night this is the specifiy date is the statin gpoint of all of us timestamps


==> Reducer is working but we want that array to live on expense property
    we need to use combineReducers it allow us to combine multiple reducer to create a single store 
    that help us to breakup our application into multiple smaller reducer as one big out of control one.
    using is very simple as the 1st argument of createStore we call combineReducers() combine reducer also take arggument 
    this is an object and on this object we provide key value pairs
      key : root state name 
      value : reduxer which manage that

==> for indivishual item called 
    filter((expense)=> {})

==> but need only id so we destructuring expense and getting id
    filter(({id})=> {})

************************************************************************
--> React redux it is a liabary that allow us to connect our redux store to our react component to make heavy
use of pattern higher order compoent 

--> Higher Order component (HOC) - A component(HOC) that randers another component(regular component)\
    so we might have 5-6 component they can render by HOC component

    advantages of HOC:
    *Reuse code
    *Render hijacking
    *Prop manipulation
    *abstract state


    
// another component
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}</p>
    </div>
);

 ===> HOC creation:
        // 1st step create a ragular function - const withAdminwarning = () => {};
        // call with the component that we want to wrap - withAdminwarning(Info);
        // 2nd step to create HOC (higher order component)- const AdminInfo = withAdminwarning(Info);
        // 3rd step we have to access the component that we are trying to wrap so the Info component is going to pass 
            in the withAdminwarning component as a first argument
        // we cann't call it  Info because withAdminwaring could be use any number of component the goal is resue the codes 
        so we can reuse this function
        // call it WrappedComponent remember this is a component so do want to start with the uppercase first letter
        // inside the withAdminwaring function we return the component which is the HOC  it will be stateless component and it retunr some jsx

        ReactDOM.render(<Info info="There are the details!" />, document.getElementById('app'));


==> install 'react redux' :
    more learn - react redux(GitHub) 

    *<Provider store> - use it once at the root of our application
    it provide the store to all of the compoenet that make our application.
    *connect - using for every single componenet that need to connect to the redux store 
            it connet your component to the redux store.
-->yarn run react-redux@5.0.5
        *import { Provider } from 'react-redux';
                    |
            it is react component, So it start from capital letter

        *create 'jsx' variable
        *provide take single props we have to pass into it this is the store that we are trying to share to our reset of the applications.
            <provider store={store}></provider>
                                |
                            your store name

        *connect() function in all of are indivisual components.
        *create the function for HOC 
        *instead of calling HOC component like we did in the HOC.js where we calling HOC.
                --> const requireAuthentication = (WrappedComponent) => {
                                        return (props) => (
                                            <div>
                                                { props.isAuthenticated ? (
                                                <WrappedComponent {...props} /> 
                                                ) : (
                                                    <p>Please login</p>
                                                ) }
                                            </div>
                                        );
                                    };
       --> we call connect() with the compoment
            const ConnectedExpenseList = connect()(ExpenseList)
                                                ^
                                                |
                        here, we provide information what we want to connect, So we define a function it will
                        determine what information from the store we want our componenet be able to access
                        and 1st argument is state 
                        and the function will return an object 

====>in ExpenseForm
     onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    * If do this :
    onNoteChange = (e) => {
        this.setState(() => ({ note : e.target.value }));
    }
    it give error because we are trying to use e.target.value in this call back which achually doesn't run rightway 
    it will run if you pull out it's own variable
    
    *If you want to contine with that use e.persist()
     onNoteChange = (e) => {
         e.persist();
        this.setState(() => ({ note : e.target.value }));
    }

--->  <input
        type="text"
        placeholder="Amount"
    />
    here we switch the type to text for amount field because we want to set some condition

*****************regular Expression *************
---->regex101.com - where you can create regular expression

---> ^\d*(\.\d{0,2})?$
\d - match the number (it match single digit)
^ - match the only number
* - match the whole number together
()? - optional group
\. - looking for dot character
\d - looking for number
{0,2} - range
$ - make sure the regular expression end what we have here

----> match() - it take regular expression

*****************************Date picker**********************
--> moment liabary - momentjs.com - it's a time liabary so it make easy to work with manuplate and formate time.
--> airbnb react-dates - GitHub - airbnd.io/react-dates - singleDatePicker- it is and open source project and 
                            it drop the calander into you application
---> react-addon-shalow-compare - it a utilite liabary which is use by react-dates internaly

---> yarn add moment@2.18.1 react-dates@12.7.0 react-addons-shallow-compare@15.6.0

-->moment() - as function we called it
***check momentjs.com - doc -display***
-->format() - we call this method with no argumnt at all.
-->numberOfMonths - how many months you want to see
-->isOutsideRange - by default singledatepicker don't allow to select the past date by using isOutsideRange we can select the past date also

-->if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
       *!amount - set this because without this the amount is not clear if we mistype 
       *{1,} - instead of * we set {1} this means before deminal there should be one value.
       
---> if(createdAt) {
        this.setState(() => ({ createdAt }))
    }
      *prevent the user to clear the value

----->React dev tool - addExpensePage - history - push() - help to change pages and it take 1 argument as path 

--->find() - method it searching for single item into array 

*****************Redux Development Tools***********************

--> it give us specific information about redux

-->redux development tools extension (GitHub Zalmoxisus) - for chrome

-->coly the window line from Redux store in GitHub Zalmoxisus and pasted that line in your configureStore.js
 file as second argument of the store.
 {window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()}

--->on the left side of redux dev tool we have all the action which despatch
-->slider will work like time traveller in your application

***********************************Filter by Date***************************
-->momentjs.com - manuplate - endOf || startOf
    startOf - we can go to the start of the month/year/hour/time...etc
    endOf - we can go to the end of the month/year/hour/time...etc

-->react-dates(GitHub) - DateRangePicker
-->momentjs.com - query - Is Same or isBefore / Is Same or isAfter

********************************Jest******************************
===> jest is a testing freamwork that was release by facebook and 
    it integrate very well with the react application 

--->  jasmine and moka - if you work with node
        karma - angular

===>learn more - jest testing - (facebook GitHub) -

--->yarn add jest@20.0.4

--->this is not we are going to import into our project
    this is more like live-server or webpack 
    we are going to use it by command line

-->on command line - yarn test - it is shorthand and same as "yarn run" 

-->test file name's extension is filename.text.js 

-->we can access the global variable that jest provide us and these allow us to
    construct our cases :-
    1. test() - (in the global section in jest docs) - this let us setup the new test case and it take two argument
                1st - any string msg,
                2nd - that code for run to the test case as a arrow function
    2. expect().toBe() - (in the Expect section in jest docs) - 
                        expect take the value what the result come and toBe()
                        toBe used with string, number , boolean
                method return what achually we want.
    3.toEqual() - methos is for array and object

---> throw new Error(`error msg`)

--->jest in watch mode :
    we can do it in two way :
    1. package.json write "jest --watch"
        it will work but some time we don't want it on watch mode

    2. in command-line 
        if we write 'yarn test --watch' it will not work
        because --watch argument is being associated with yarn command
        not with the just command not with the jest command
        *we use "yarn test -- --watch"
                            |
                        this means everything before that is
                    associated with yarn cammnad and after that is
                associated with script.
        it will run 

**********************************************************
-->@@INIT - inside redux dev tool - this use internaly by redux we never going to 
        response to this inside our reduxer or dispatch our own
        but we can use in test cases
        
-->react-test-renderer - it's an react liabray and it alow to render our components
            inside of regular js code 
    *yarn add react-test-renderer@16.0.0
    *property of react-test-renderer - 
          ReactShallowRenderer - it only render the given components
          fullDomRenderer - it render child components

-->snapShot - allow us to track changes to data over time
    jest - expect - toMatchSnapShot
    1st time we renderer the test case it always going to pass because there is not
    exiting snapshot. So, jest go head and create new one it's going to create a snapshot
    of what the renderer Header output looklike and the 2nd time we renderer 
    this test case it is gojng to compair with the exiting one if the same test will pass 
    or if not test going to fail

-->ReactShallowRenderer - it is not complex utilite and that's the problem for us 
                we have more complex thing that we want to test it.
                so we are going to use Enzyme.

--->Enzyme - released by airbnb and it is a renderer for react but it is much more 
            full featured renderer.

     *yarn add enzyme@3.0.0 enzyme-adapter-react-15@1.4.3 raf@3.3.2 

    enzyme-adapter-react :- it allow us to specifiy which version of react we test against 
    this allow the core liabary to whole lot smaller 

    raf (request animation frame) :- it is browser feature and it is provided by your browser and if we don't have it 
    in this testing envoirment it does cause some issue.

    lean more : airbnb.io/enzyme or enzyme - (js tesing)

==>setupTests.js - this is going to be a file that run and allow us 
                    to configure the envoirment we are running it

==> jest.config.json - jest comfiguration file which allow us to specifiy that the setupTests 
    file is should run 

    facebook.gitHub.io/jest - docs - API Reference - configuration jest - setupFiles

==>{ shallow } : Shallow rendering is useful to constrain yourself 
                    to testing a component as a unit, and to ensure that
                 your tests aren't indirectly asserting on behavior of 
                 child components.

==>find() : it find render tree that matches the provided selector.

==>text() : Returns a string of the rendered text of the current render tree.

==>enzyme-to-json - (GitHub) : to make enzyme work with snapshot testing functionality we have to install a utilitie liabary
                                we grap 'toJson' from it and we use it when we are expecting something grom our enzyme wrapper
    *yarn add enzyme-to-json@3.0.1
    ==> Header.Test.js
        import toJSON from 'enzyme-to-json';
        expect(toJSON(wrapper)).toMatchSnapshot();
    ==> If you configure toJSON in jest.config.json you don't need to use toJSON directly(like above)
        "snapshotSerializers" : [
             "enzyme-to-json/serializer"
        ]
        and restart the test suite.

==>inside the "ExpenseForm" we are grabing the moment at the current point in time 
    obviously every single time we run the test case the pointing time has change this is the problem 
    we need a way to same data back without achually changing it
    to fix this we are going to mocking out the moment, So, we are going to create fake version of the moment liabary
    it all us to define what happens when code achually called and return moment at the specifiy point of time.

    jest testing - manual mocks

    we create new file for fake moment version. So in the real application it call moment liabary
    and when it called in test file we are going to use mock version of liabary.

==>simulate an event : learn more - enzyme - api Reference - simulate(it grab the event)
     enzyme - api Reference - state(it look fetch the data by given value)
    
    --> expect(wrapper.state('error').length).toBeGreaterThan(0);
        if the error.length is greater than 0 it means there is a error

==>Test Spies - it check the function is called with same data/argument or not
    *jest.fn() - this is a function with no argument and it return a new spy.
                just we have to save into a variable.
                lean more : jest testing - arpi Reference - expect - toHaveBeenCalled()

===>props() - it is feature given by enzyme and it read props value.
    prop([key]) - it only read the given key value

==>inside the "AddExpensePage" we are Reference a function which is imported not we passed as prop
    that's make "AddExpensePage" hard to test 
    but there is function called "mapDispatchToProp" we can define in connect that allow us to do this.
    We know that connect's 1st function is "mapStateToProp" which work with state.So, we  pass the undefined for that
    and the 2nd function is "mapDispatchToProp" and this function work with dispatch

    lear more : react-redux - (gitHub) - connect[mapDispatchToProp]

==> if you find your self with lot of duplicate staff. So, you can create a single version of it.
    by using jest global lifecycle methods :
    afterAll, AfterEach, beforeAll, beforeEach
    
    **beforeEach - we make a fresh copy of spy before each test case run

==>mapDispatchToProp's parameter :-
   (1) dispatch
   (2) ownprops
  
     *ownProps ( optional )
      If your mapDispatchToProps function is declared as taking two parameters, 
      it will be called with dispatch as the first parameter and the props passed to the connected component 
      as the second parameter, and will be re-invoked whenever the connected component receives new props.

==>setProps(props) : it's a method given by enzyme and i allow to manuplate component behaviour over time with
            changing props.

===>Git : install - git-scm.com 
            Git is just like a video game. In video game you can always go back to previous stage and 
            Git also store all of the code and previous code so we can Reference whenever we needed.
        
        *repository - is just a folder where application code live.(1 project - 1 repository, 2 project - 2 repository)
                        as soon as make make repository it will pickup all of application files

        *untracked Files - git does not know about it 
        *commits - it's like save point and we save untracked file for this we have to run some command :
                    -add command - let's us take file from being untracked files to being staged changes files
        *staged changes - where we grather all of the file which we want to save and i can save it into commits.
        *unstaged changes - where those file come which is tracking by Git but we did some changes.
                        and save unstaged file we have to run add command and commits it.

        *we create new repository we have to run the command and this command need to be excuted from the root
        of your project 
                    -git init - to do this we run 'git init' - it create git directory with the project path. this directory 
                        provided by Git and we cann't change it by manually we can change it by command line 
                    -git status - it tell us about the project file status at the current point of time 
                                    like which file is where
        
        *now we have to track the file which we wrote and some we don't want to track down 
        like node-modules.
        *for this we have to create a new file in the project in the root called .gitignore and mantion the file
        we don't want to track .
                   -git add file_name/folder_name - 
                   -git add . - this will add all of the file we had
                   -git commit -m "initial commit" - when we commit we have to provide a human readable massage.
                    - git config --global user.email "you@example.com"
                     - git config --global user.name "Your Name"

        *working tree clean means that everything is added and is the same as last commmit


                    -git log - is the read only command. it show all of the commit we did.

            
        ==> git init - create a new repo
            git status - view the changes to your project code 
            git add - add files to staging area
            git commit - created a new commit with files from staging area
            git log - view recent commits


==>create a a/c on github and we need to securly communicate to gitHub to comandline
    select - public - so other can see your code
    *after creating new reposatory github show some command for new repo and exiting repo
    *but can't run them becasue we don't have secure way to communicate between our machine and gitbug server
    
    --> SSH : to do that we create SSH which stand for secure shall and this is a secure way for two machine to communicate
    *in order to make it secure we have to setup SSH key by using a simple command 
    *for window you have to use git blash the commands we use to check SSH key and create new one are not going to avaiable on regular window command line.So, switch over to git blash 
    *if your are mac/os/linux we can continue to use regular command line 

            => ls -al ~/.ssh : it check for existing key
        
        -> ls : list out in a specific folder
        -> -a : make sure it show the all hidden file as well
        -> ~/.ssh : and the folder we are looking for is in the user directly call .ssh (~) till thought is a short cut for the user directly
      
      *if get msg like "ssh folder does not exist" it msg for woindow user it means your don't have ssh key
      and for mac is show emplty folder it means you have to create ssh key
      *if you get some id like "_ssh" it means you have ssh key

      ==>two file are associate with ssh key : 
        ->private file - which keep up our machine
        ->public file - whihc we give up to 3rdthe party services like GitHub

==> we visit to check command - (google)connecting to github with ssh (github help) - window

            =>ssh-keygen -t rsa -b 4096 -C "dadsa@gmail.com"

        -> ssh-keygen : generate ssh key
        -> -t : specifiy the type we create and there are different type key we can create 
        -> rsa :  we are using rsa to communicate with the github
        -> -b : bites and followed with some number (4096) the bigger the key the harder to crack and this is the size recommanded by github 
        -> -C :  comment and this allow us to provide our email address "sad@gmail.com"

    * it will ask some question just hit enter and again check the ssh key by using ssh key check command 
    * it will give two file: 
        - id_rsa - private file key treated like password.if someone access this they can steal our identity
                    and they trick this id and think that they were us.
        - id_rsa.pub = public file key

==>ssh agent : it make sure that when we try to communicate with another server like gitHub it achually know which ssh key to use.this is requre to use ssh agent  and 1st think we have to make sure it is running 

            =>eval "$(ssh-agent -s)" : it check ssh agent is running. 
                                            if it is running it let's to know that
                                            if it is not running it sart the process
            =>ssh-add ~/.ssh/id_rsa 
            -> ssh-add : add the new key 
            -> ~/.ssh/id_rsa :  it is path of private ssh key file
        
        * now it the identiy has been added now we achually ready to take the public key file and give that to 3rd party servies like github 
        *to get this done : 
            =>the goal is the take content of the id_rsa.pub file  and copy it to the clip board 
                        
    
-->We visit to check command - (google)connecting to github with ssh (github help) - window - adding a new ssha key to the github a/c - window  
    -> and use that command to copy the thing to the clip board 

    - copy the command and pasted into command line (blash) and hit enter and this is going to take it content 
        of the pub file and copy it to the clipboard 
    -once it copy to the clipboard we have to give it to github 
    -to do that :
        -go to github profile page - settings - ssh and gpg keys - new ssh key - give the title(work window)
            - key(paste it which we copy from the clip board) - add ssh key

-==> now we can securely communicate with our machine to github

==>run a test command to make sure everthing is set correclty 

            =>ssh -T git@github.com
            -> -T :  disable the some feture which we are not trying to use


===>now we have to push our code : 
        ->go to the repo which we created in the github a/c
        ->select ssh and coly the URL and run this from git and let git know this where our remote code should live.TO do that : 
             ->open command line(blash)
                    =>git remote add orgin pasteTheURL

                    -> git remote add :  it provide us a remote name and a remote url
                    ->origin : default name and this is name repository and the value is the URL we just copy
                            so paste it and hit enter

            =>if we run "git remote" origin is showing up
            =>if we run "git remote -v" shwo the URL one for fetch and one for push

    =>now push the code :

        ->git push -u origin main

            -> -u : this create the association b/w local code and upstream github repository and 
                    we have use (-u) only one right now we never use it again 
            -> origin : remote name
            -> main : branch name/this is default name
        ->refresh the github page 

    

















