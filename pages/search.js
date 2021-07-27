import Head from 'next/head'
import Header from '../components/manufacturersandsuppliers/Header/Header'
import style from '../components/searchPage/Search.module.css'
import {useRouter} from 'next/router'
import {useEffect, useState, useRef} from 'react'
import CategorySectionSlider from '../components/categorySectionSlider/CategorySectionSlider'
import axios from 'axios'
import SearchResult from '../components/searchPage/searchResult/SearchResult'
import Progress from '../components/searchPage/progress/Progress'

export default function Search(props) {

    const [categories, setCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [menuSelected, setMenuSelected] = useState();
    const [searchResults, setSearchResults] = useState();
    const [counties, setCounties] = useState();
    const [constituencies, setConstituencies] = useState();
    const [sortedResults, setSortedResults] = useState([]);
    const [resultsForDisplay, setResultsForDisplay] = useState([]);
    const [filtering, setFiltering] = useState(false);
    const [searching, setSearching] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        // This function should run whenever search query changes
        async function getData(){
            await axios.get(props.baseURL+'/categories')
            .then(res=>{
                setCategories(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })

            const counties = await axios.get(props.baseURL+'/counties?_limit=-1');
            setCounties(counties.data);

            const constituencies = await axios.get(props.baseURL+'/constituencies?_limit=-1');
            setConstituencies(constituencies.data);
        }
        getData();
    }, [props.baseURL])

    useEffect(()=>{
        setSearchResults({availableCategories:[], serverResponse:[]});
        async function getData(){
            setSearching(true);
            setResultsForDisplay([]);
            await axios.get(props.baseURL+'/search?q='+router.query.q)
            .then(res=>{
                setSearchResults(res.data);
                setResultsForDisplay(res.data.serverResponse);

                //This block is responsible for sorting the results
                let sortedResults = [];
                sortedResults[0] = res.data.serverResponse;
                function sortingFunction(sortedArray, index, element){
                    if(sortedArray[index]==undefined){
                        sortedArray[index]=[].concat(element);
                    } else {
                        sortedArray[index].push(element);
                    }
                }
                res.data.serverResponse.map((element, index)=>{
                    if(element.productName){
                        sortingFunction(sortedResults, 9, element);
                    } else if (element.vehicleType){
                        sortingFunction(sortedResults, 6, element);
                    } else if (element.title){
                        sortingFunction(sortedResults, 10, element);
                    } else if (element.name){
                        sortingFunction(sortedResults, 3, element);
                    } else if (element.companyName){
                        sortingFunction(sortedResults, 1, element);
                    }
                })
                setSortedResults(sortedResults.slice());
                setTimeout(setSearching(false), 2000);
            })
            .catch(err=>{
                console.log(err.response);
            })
        }
        getData();
    }, [router.query.q])

    useEffect(()=>{
        if( searchResults!=undefined && categories.length>0){
            //console.log(searchResults.serverResponse);
            let availableCategories = [];
            categories.map((element, index)=>{
                if(searchResults.availableCategories.indexOf(element.id)!=-1){
                    availableCategories.push(element);
                }
            })
            setAvailableCategories(availableCategories.slice());
        }
    }, [searchResults, categories])

    //This block is responsible for sorting according to categories;
    useEffect(()=>{
        //console.log(menuSelected);
        if(menuSelected!=undefined && sortedResults.length>0){
            setFiltering(true);
            if(sortedResults[menuSelected.id]!==undefined){
                setResultsForDisplay([])
            
                //setResultsForDisplay(sortedResults[menuSelected.id].slice());
                setTimeout(()=>{
                    setResultsForDisplay(sortedResults[menuSelected.id].slice());
                    setFiltering(false);
                }, 500)
            } else {
                setMenuSelected({
                    name:"All",
                    id:0,
                    subCategory:0
                });
                setResultsForDisplay(sortedResults[0].slice());
                setFiltering(false);
            }
        }
    }, [menuSelected, sortedResults])

    return (
        <div>
            <Head>
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-8VYK6XCD9G"></script>

                {/* FontAwesome icons */}
                <script src="https://kit.fontawesome.com/e477c42a9e.js" crossOrigin="anonymous"></script>

                {/* FontAwesome icons */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" 
                integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" 
                crossOrigin="anonymous" />

                <title> Results - </title>

            </Head>

            <Header title="Builders Guide Kenya" router={router} />
            <main className={style.body}>
                <div className={style.searching}>
                    <h1>Searching for {router.query.q}...</h1>
                </div>
                {
                    availableCategories.length>0?
                        <div className={"categoryNavigation"}>
                            <CategorySectionSlider 
                                subCategories={availableCategories}
                                name={undefined}
                                menuSelected={menuSelected}
                                setMenuSelected={data=>setMenuSelected(data)}
                            />
                        </div>
                    :undefined
                }
                {/* <div>
                    <button>Filter</button>
                </div> */}
                {/* The search body goes here */}
                <div className={style.searchResults}>
                    {
                        resultsForDisplay!=undefined?
                            resultsForDisplay.length>0?
                                resultsForDisplay.map((element, index)=>(
                                    <SearchResult
                                        key={index}
                                        result={element}
                                        index={index}
                                        counties={counties}
                                        constituencies={constituencies}
                                        baseURL={props.baseURL}
                                        index={index}
                                    />
                                ))
                            :searching?
                                <Progress message="Searching..."/>
                            :filtering?
                                <Progress message="Filtering..."/>
                            : <Progress message={"Couldn't find "+router.query.q} image={false} />
                        : undefined
                    }
                </div>
            </main>
        </div>
    )
}
