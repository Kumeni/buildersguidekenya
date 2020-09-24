import React from 'react'
import style from './articleContent.module.css'
import ArticleTitle from '../articleTitle/articleTitle'

export default function ArticleContent() {
    return (
        <div className={style.articleContent+ ' container'}>
            <ArticleTitle />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis aliquam suscipit. Donec vehicula, ante vitae consectetur pharetra, metus sapien cursus nisl, sed laoreet mi tortor sit amet sapien. Donec a eleifend dui, a commodo dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin ut quam arcu. Pellentesque ut ultricies felis. Donec tincidunt at tellus et sollicitudin. Praesent ante elit, imperdiet vel varius a, dapibus vel felis. Sed in felis nec erat dignissim volutpat ut eget eros. Quisque pulvinar, urna vel tempor hendrerit, est purus laoreet ipsum, nec fermentum est felis sed nibh. Integer porttitor, mauris ut rutrum laoreet, purus tortor rhoncus magna, eget sodales est ex vitae ex. Aliquam a tellus in ante maximus tincidunt. Vestibulum convallis ex dolor, eu tincidunt justo facilisis nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam pulvinar ex a sem vestibulum, eu pretium erat ultricies.
            </p>
            <p>
                Maecenas rhoncus eget dui quis accumsan. Aliquam semper nunc non magna vulputate facilisis. Nam condimentum magna id odio mollis, sed commodo sem facilisis. Integer dignissim, augue ac consequat dapibus, lorem arcu malesuada ante, sed tempor mauris sem sit amet augue. Ut rutrum pellentesque ligula non fringilla. Nullam at feugiat enim, non semper nibh. Integer porta faucibus purus. Aliquam id nunc vel lacus venenatis tincidunt in vel lacus. Pellentesque vitae suscipit est, in finibus orci. Curabitur bibendum vulputate leo a imperdiet.
                Vestibulum sodales nunc porttitor risus consequat, id pulvinar tellus laoreet. Donec eget metus at dolor cursus cursus quis quis diam. Quisque scelerisque nibh a pharetra tempor. Donec ut est scelerisque, malesuada elit ac, fringilla tortor. Nulla ac sodales nisi, ac tincidunt sapien. Nunc aliquet lacus quis gravida hendrerit. Suspendisse potenti. Aenean blandit neque a erat dictum, vel egestas libero lacinia. Cras fermentum, ex nec malesuada ultrices, lacus risus suscipit libero, eget elementum felis tortor sit amet massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur eget faucibus nulla. Duis at ligula diam. Nam luctus in nunc sed fermentum.S
            </p>
            <p>
                uspendisse potenti. Quisque sem sem, luctus eget dictum ac, dignissim et velit. Donec convallis tristique turpis in ullamcorper. Duis consectetur lectus fermentum, condimentum nulla eget, eleifend purus. Praesent eu neque dignissim, ornare ipsum non, auctor eros. Cras ante mauris, pretium ac velit sed, pellentesque ullamcorper nisl. Etiam suscipit pharetra euismod. Etiam ullamcorper eu urna non volutpat. In sapien lectus, convallis ut ante euismod, gravida placerat mi. Curabitur eget magna nec tellus scelerisque semper. Mauris posuere maximus tortor, ut lobortis turpis convallis sit amet.
                Fusce eu lorem nec arcu posuere tincidunt vulputate sed nunc. Pellentesque feugiat, justo id faucibus blandit, nibh nunc dictum tortor, vel fringilla tortor ipsum eu elit. Sed maximus urna quis quam ullamcorper commodo. Nam at pharetra risus. Pellentesque et nunc turpis. Sed condimentum eu leo quis porttitor. Vestibulum vel tortor metus.
            </p>
        </div>
    )
}
