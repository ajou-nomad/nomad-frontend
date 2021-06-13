## 아주대학교 SW 캡스톤 디자인 - Team Nomad [![Build Status](https://www.travis-ci.com/ajou-nomad/nomad-backend.svg?branch=master)](https://www.travis-ci.com/ajou-nomad/nomad-backend)

### Title: Dutch Delivery

---

# frontend

# 1. 프로젝트 소개

## 1.1 더치딜리버리란?

더치딜리버리는 <b>위치 기반 공동 배달 플랫폼</b>이다.

소비자들은 동일한 위치, 시간에 여러 사람과 같이 배달에 참여하여 부담되었던 <b>배달비와 최소 주문 금액 걱정 없이</b> 배달을 즐기고, 점주는 여러 명의 주문을 한 번에 보내기 때문에 <b>기존보다 적은 수수료로 더 많은 배달 서비스</b>를 제공받으며, 배달원은 저희가 새롭게 규정한 수수료 정책에 혜택을 받아 <b>노동에 비해 더 많은 수수료를</b> 얻어가는 배달 서비스를 제공해줍니다.

## 1.2 개발 동기 및 목적

최근에 코로나 19로 인하여 외식이나 모임이 줄어들고 집에 있는 시간이 늘어남에 따라 <b>배달 서비스가 많이 이용되는 추세</b>이다. 그에 따라 개인이 배달을 시키는 경우도 늘어나게 되었는데 기존의 서비스는 <b>최소주문금액이 높아 개인이 주문을 하지 못하는 경우</b> 가 생기고 최소주문금액을 맞추었더라도 <b>배달비가 추가되어 배달 서비스를 이용할 때 재정적 부담이 예상보다 커지는 경우</b> 가 많이 일어난다. 또한 늘어나는 배달 수수료로 인하여 가게 점주들도 <b>배달 서비스를 사용하는데 경제적 부담</b> 을 가지고 있으며 배달 서비스의 사용이 늘어남에 따라 <b>배달원들의 전체 노동시간이 증가</b> 되고 있는 상황이다. 이러한 여러 이해관계자들의 불편들을 해소하기 위하여 ‘더치딜리버리’라는 서비스를 개발하였다.

## 1.3 기대효과

우리는 더치딜리버리를 통하여 기존의 배달 서비스에서 생긴 불편사항들을 해결하고자 하며 그로 인하여 배달 서비스가 더 활성화되는 것을 목표로 하고 있다.

## 1.4 개발도구 및 버전

- ![node](https://img.shields.io/badge/node-%20v15.11.0-brightgreen)

- ![npm](https://img.shields.io/static/v1?label=npm&message=v7.6.0&color=blue)

- ![react-native](https://img.shields.io/static/v1?label=react-native&message=v0.63.4&color=violet)

- ![react-native-cli](https://img.shields.io/static/v1?label=react-native-cli&message=v2.0.1&color=blueviolet)

## 1.5 사용된 외부 API

- [Google Maps](https://developers.google.com/maps/)
- [Firebase](https://firebase.google.com/)
- [I'mport](https://www.iamport.kr/)
- [Daum Postcode Service](https://postcode.map.daum.net/guide)

# 2. 구현 기능

## 2.1 메인 기능

### 2.1.1 당일 모집 - 유저의 배달 그룹 생성 및 확인

당일 모집은 당일에 생성된 배달에 참여하는 기능으로 원하는 장소와 시간을 정해서 직접 당일 모집 배달을 생성할 수 있다.

<img src="https://user-images.githubusercontent.com/55270881/121771655-91268900-cbab-11eb-96a9-101e02da1aa2.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121797370-b0302400-cc5a-11eb-9931-8c0727daf2d8.gif" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121780512-a2878980-cbdb-11eb-9a21-51f6d6593844.gif" width="250">

- 당일 모집을 선택
- 지도에 생성된 배달이 없는 경우 '원하는 조건이 없나요?' 버튼을 눌러 원하는 위치를 선택
- 배달 가능한 주변 매장 목록 중 원하는 매장과 메뉴를 선택

<img src="https://user-images.githubusercontent.com/55270881/121780608-1cb80e00-cbdc-11eb-996f-2f7c90df1fe7.gif" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121781444-b339fe80-cbdf-11eb-91d1-69afc8255eb5.gif" width="250">

- 배달 받을 장소의 건물명, 배달 시간, 모집 인원을 입력
- 결제가 완료되면 생성된 배달이 지도에 마커로 표시되고, 주문 내역 페이지에서 자신의 주문 내역을 확인 가능

### 2.1.2 주간 모집 - 유저의 그룹 생성 및 참여

주간 모집은 한 주간의 배달을 미리 예약하는 기능이다.

<img src="https://user-images.githubusercontent.com/55270881/121782725-fbf4b600-cbe5-11eb-8a8e-61844e54f35c.png" width="230"> <img src="https://user-images.githubusercontent.com/55270881/121782912-e8961a80-cbe6-11eb-9b9a-cea216b00e4b.png" width="230"> <img src="https://user-images.githubusercontent.com/55270881/121783010-7eca4080-cbe7-11eb-84dc-f22bec880e84.gif" width="230"> <img src="https://user-images.githubusercontent.com/55270881/121797759-4a916700-cc5d-11eb-8838-f6ba268ef6f3.gif" width="230">

- 주간 모집 선택
- 원하는 배달 장소 선택
- 캘린더를 통해 생성된 배달 그룹을 확인하고, 원하는 배달 그룹이 없는 경우 직접 생성
- 건물명, 배달 날짜 및 시간, 모집 인원 입력
- 당일 모집과 동일하게 결제를 완료하면 생성된 배달이 표시되고, 주문 내역 페이지에서 자신의 주문 내역을 확인 가능

### 2.1.3 매장의 주문 접수

<img src="https://user-images.githubusercontent.com/55270881/121783843-e84c4e00-cbeb-11eb-9fa1-1389f21e0c02.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121783840-e71b2100-cbeb-11eb-83dc-5ed83917ee6b.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121783844-e8e4e480-cbeb-11eb-9b5c-a41e3c6bf913.png" width="250">

- 매장은 최소 모집 인원이 충족된 주문 건들을 볼 수 있고, 주문 접수 가능
- 조리가 완료되면 배달 가능한 상태로 변경

### 2.1.4 배달원의 배달 선택

<img src="https://user-images.githubusercontent.com/55270881/121784289-2480ae00-cbee-11eb-9956-ff0b605902ad.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784293-25b1db00-cbee-11eb-8e69-694cb785df4b.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784294-264a7180-cbee-11eb-8a39-f101aea23be7.png" width="250">

- 배달원은 자신의 위치를 기반으로 배달 가능 목록을 확인 가능
- 원하는 배달 선택

### 2.1.5 배달원의 메시지 전달

<img src="https://user-images.githubusercontent.com/55270881/121784699-5a269680-cbf0-11eb-9e54-ec985526cc83.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784701-5abf2d00-cbf0-11eb-8290-a052f836233f.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784702-5b57c380-cbf0-11eb-8ac4-87f04f85ba08.png" width="250">

- 배달을 선택하게 되면 배달원과 배달에 참여한 유저들과 채팅방으로 연결
- 배달 현황을 전달
- 배달 완료 버튼을 통해 배달 마무리 가능

## 2.2 부가기능

<details>
      <summary>자세히 보기</summary>

### 2.2.1 유저

<img src="https://user-images.githubusercontent.com/55270881/121799375-b1674e00-cc66-11eb-9404-041f66ebb817.gif" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121799458-32bee080-cc67-11eb-973c-96015d07e09e.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121799459-33f00d80-cc67-11eb-85e7-57c411fdae3b.png" width="250">

유저는 배달 완료된 주문 건에 대해서 리뷰 작성 가능

### 2.2.2 점주

- 메뉴 관리 수정 기능

<img src="https://user-images.githubusercontent.com/55270881/121804915-c1d9f180-cc83-11eb-8497-7ba2b3db55c5.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121804917-c30b1e80-cc83-11eb-9768-7c2de0df3629.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121804918-c3a3b500-cc83-11eb-9547-d80d7974227b.png" width="250">

팥인절미 1인 빙수 가격 변경

- 메뉴 관리 삭제 기능

<img src="https://user-images.githubusercontent.com/55270881/121805025-3e6cd000-cc84-11eb-9e93-34636a45875e.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121805026-3f9dfd00-cc84-11eb-8f0d-4d22131f5e7e.png" width="250">

아인슈페너 ICE 삭제

- 메뉴 관리 메뉴 추가 기능

<img src="https://user-images.githubusercontent.com/55270881/121805059-68be8d80-cc84-11eb-9be3-c57d2e9162a8.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121805061-69efba80-cc84-11eb-9944-a095898231b0.png" width="250">

카라멜 프로틴 밀크 추가

- 그 외 기능들

<img src="https://user-images.githubusercontent.com/55270881/121805109-a3282a80-cc84-11eb-9402-c942a4ceef9d.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121805110-a4595780-cc84-11eb-8ea3-70d535ecabd1.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121805112-a4595780-cc84-11eb-9036-539918ba8b5f.png" width="250">

완료된 주문, 매출현황, 매장 관리

</details>

## 3. Author

|            손지성(Frontend)            |            이상경(Backend)             |             이화진(Frontend)             |                전민건(Frontend)                |         최호영(Backend)          |
| :------------------------------------: | :------------------------------------: | :--------------------------------------: | :--------------------------------------------: | :------------------------------: |
| [@Danji-ya](https://github.com/Danji-ya) | [@sksk713](https://github.com/sksk713) | [@sqaurelu](https://github.com/sqaurelu) | [@JeonMinGeon](https://github.com/JeonMinGeon) | [@Ho-0](https://github.com/Ho-0) |

## 4. License

      Copyright (c) 2021 Nomad

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
