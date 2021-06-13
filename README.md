## 아주대학교 SW 캡스톤 디자인 - Team Nomad [![Build Status](https://www.travis-ci.com/ajou-nomad/nomad-backend.svg?branch=master)](https://www.travis-ci.com/ajou-nomad/nomad-backend)

### Title: Dutch Delivery

---

# frontend

# 1. 프로젝트 소개

## 1.1 더치딜리버리란?

더치딜리버리는 <b>위치 기반 공동 배달 플랫폼</b>으로서, 소비자들은 동일한 위치, 시간에 여러 사람과 같이 배달에 참여하여 부담되었던 <b>배달비와 최소 주문 금액 걱정 없이</b> 배달을 즐기고, 점주는 여러 명의 주문을 한 번에 보내기 때문에 <b>기존보다 적은 수수료로 더 많은 배달 서비스</b>를 제공받으며, 배달원은 저희가 새롭게 규정한 수수료 정책에 혜택을 받아 <b>노동에 비해 더 많은 수수료를</b> 얻어가는 배달 서비스를 제공해줍니다.

## 1.2 개발 동기 및 목적

최근에 코로나 19로 인하여 외식이나 모임이 줄어들고 집에 있는 시간이 늘어남에 따라 <b>배달 서비스가 많이 이용되는 추세</b>이다. 그에 따라 개인이 배달을 시키는 경우도 늘어나게 되었는데 기존의 서비스는 <b>최소주문금액이 높아 개인이 주문을 하지 못하는 경우</b> 가 생기고 최소주문금액을 맞추었더라도 <b>배달비가 추가되어 배달 서비스를 이용할 때 재정적 부담이 예상보다 커지는 경우</b> 가 많이 일어난다. 또한 늘어나는 배달 수수료로 인하여 가게 점주들도 <b>배달 서비스를 사용하는데 경제적 부담</b> 을 가지고 있으며 배달 서비스의 사용이 늘어남에 따라 <b>배달원들의 전체 노동시간이 증가</b> 되고 있는 상황이다. 이러한 여러 이해관계자들의 불편들을 해소하기 위하여 ‘더치딜리버리’라는 서비스를 개발하였다.

## 1.3 기대효과

우리는 더치딜리버리를 통하여 기존의 배달 서비스에서 생긴 불편사항들을 해결하고자 하며 그로 인하여 배달 서비스가 더 활성화되는 것을 목표로 하고 있다.

## 1.4 사용 기술

# 2. 구현 기능
## 2.1 메인 기능
### 2.1.1 당일 모집 - 배달 그룹 생성 및 확인
당일 모집은 당일에 생성된 배달에 참여하는 기능으로 원하는 장소와 시간을 정해서 직접 당일 모집 배달을 생성할 수 있다.

<img src="https://user-images.githubusercontent.com/55270881/121771655-91268900-cbab-11eb-96a9-101e02da1aa2.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121797370-b0302400-cc5a-11eb-9931-8c0727daf2d8.gif" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121780512-a2878980-cbdb-11eb-9a21-51f6d6593844.gif" width="250">

- 당일 모집을 선택
- 지도에 생성된 배달이 없는 경우 '원하는 조건이 없나요?' 버튼을 눌러 원하는 위치를 선택
- 배달 가능한 주변 매장 목록 중 원하는 매장과 메뉴를 선택

<img src="https://user-images.githubusercontent.com/55270881/121780608-1cb80e00-cbdc-11eb-996f-2f7c90df1fe7.gif" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121781444-b339fe80-cbdf-11eb-91d1-69afc8255eb5.gif" width="250">

- 배달 받을 장소의 건물명, 배달 시간, 모집 인원을 입력
- 결제가 완료되면 생성된 배달이 지도에 마커로 표시되고, 주문 내역 페이지에서 자신의 주문 내역 확인 가능

### 2.1.2 주간 모집 - 그룹 참여
주간 모집은 한 주간의 배달을 미리 예약하는 기능이다.

<img src="https://user-images.githubusercontent.com/55270881/121798350-b2957c80-cc60-11eb-8c6c-dab12a17c391.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121798478-8b8b7a80-cc61-11eb-8f11-60b1a67bd136.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121798351-b32e1300-cc60-11eb-99fd-e32f687aeab8.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121798347-b1644f80-cc60-11eb-8869-6f02db914fbf.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121798349-b2957c80-cc60-11eb-9a37-f7f76e32783a.png" width="250">

- 주간 모집 선택
- 원하는 배달 장소 선택
- 캘린더를 통해 생성된 배달 그룹을 확인하고, 원하는 배달 그룹에 참여
- 결제를 완료하면, 주문 내역 페이지에서 자신의 주문 내역 확인 가능


### 2.1.3 매장의 주문 접수

<img src="https://user-images.githubusercontent.com/55270881/121783843-e84c4e00-cbeb-11eb-9fa1-1389f21e0c02.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121783840-e71b2100-cbeb-11eb-83dc-5ed83917ee6b.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121783844-e8e4e480-cbeb-11eb-9b5c-a41e3c6bf913.png" width="250">

### 2.1.4 배달원의 배달 선택

<img src="https://user-images.githubusercontent.com/55270881/121784289-2480ae00-cbee-11eb-9956-ff0b605902ad.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784293-25b1db00-cbee-11eb-8e69-694cb785df4b.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784294-264a7180-cbee-11eb-8a39-f101aea23be7.png" width="250">

## 2.1.5 배달원의 메시지 전달

<img src="https://user-images.githubusercontent.com/55270881/121784699-5a269680-cbf0-11eb-9e54-ec985526cc83.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784701-5abf2d00-cbf0-11eb-8290-a052f836233f.png" width="250"> <img src="https://user-images.githubusercontent.com/55270881/121784702-5b57c380-cbf0-11eb-8ac4-87f04f85ba08.png" width="250">

### 2.1.6 점주의 매장 관리

## 2.2 부가기능
### 2.2.1 유저

### 2.2.2 배달원

### 2.2.3 점주

### 개발 도구 및 버전

- ![node](https://img.shields.io/badge/node-%20v15.11.0-brightgreen)

- ![npm](https://img.shields.io/static/v1?label=npm&message=v7.6.0&color=blue)

- ![react-native](https://img.shields.io/static/v1?label=react-native&message=v0.63.4&color=violet)

- ![react-native-cli](https://img.shields.io/static/v1?label=react-native-cli&message=v2.0.1&color=blueviolet)

## 사용된 외부 API

- GoogleMapAPI - 지도와 주소 검색을 위한 API

## Only for Android

<!-- summary 아래 한칸 공백 두고 내용 삽입 
<details>
  <summary> 주간모집 그룹 생성</summary>
  <img src="https://user-images.githubusercontent.com/55270881/121782725-fbf4b600-cbe5-11eb-8a8e-61844e54f35c.png" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121782912-e8961a80-cbe6-11eb-9b9a-cea216b00e4b.png" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121783010-7eca4080-cbe7-11eb-84dc-f22bec880e84.gif" width="250">
:---:|:---:|:---:
주간 모집 선택 | 원하는 장소 선택 | 캘린더 확인 후, 원하는 매장 및 메뉴 선택
<img src="https://user-images.githubusercontent.com/55270881/121780608-1cb80e00-cbdc-11eb-996f-2f7c90df1fe7.gif" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121781444-b339fe80-cbdf-11eb-91d1-69afc8255eb5.gif" width="250"> |
건물명, 배달 시간, 모집 인원 입력 | 생성된 주문 지도에 표시, 주문 내역 확인 가능 |

</details>

<details>
    <summary> 당일모집 그룹 생성</summary>



<img src="https://user-images.githubusercontent.com/55270881/121771655-91268900-cbab-11eb-96a9-101e02da1aa2.png" width="300"> <img src="https://user-images.githubusercontent.com/55270881/121771658-91bf1f80-cbab-11eb-9d96-382c7d35d183.png" width="300"> <img src="https://user-images.githubusercontent.com/55270881/121771659-9257b600-cbab-11eb-8577-63e4d0c2dbbd.png" width="300">

<img src="https://user-images.githubusercontent.com/55270881/121771950-6b9a7f00-cbad-11eb-8ea6-5b49b66b01f3.png" width="300"> <img src="https://user-images.githubusercontent.com/55270881/121771907-3b52e080-cbad-11eb-8c6e-1b5d75d7be53.png" width="296"> <img src="https://user-images.githubusercontent.com/55270881/121771872-0b0b4200-cbad-11eb-9d38-3935f95a3988.png" width="300">

| <img src="https://user-images.githubusercontent.com/55270881/121771655-91268900-cbab-11eb-96a9-101e02da1aa2.png" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121772165-af41b880-cbae-11eb-9652-b575be30c867.gif" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121780512-a2878980-cbdb-11eb-9a21-51f6d6593844.gif" width="250"> |
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
|                                                        당일 모집 선택                                                         |                                              마커를 이용하여 주문할 위치를 지정                                               |                                                   원하는 매장 및 메뉴 선택                                                    |
| <img src="https://user-images.githubusercontent.com/55270881/121780608-1cb80e00-cbdc-11eb-996f-2f7c90df1fe7.gif" width="250"> | <img src="https://user-images.githubusercontent.com/55270881/121781444-b339fe80-cbdf-11eb-91d1-69afc8255eb5.gif" width="250"> |
|                                               건물명, 배달 시간, 모집 인원 입력                                               |                                         생성된 주문 지도에 표시, 주문 내역 확인 가능                                          |

</details>

```
|
├─assets
│  ├─fonts
│  ├─icons
│  └─images
├─components
│  ├─carrier
│  ├─item
│  ├─layout
│  ├─login
│  ├─map
│  ├─payment
│  ├─store
│  └─weekly
├─constants
├─context
├─navigation
├─screens
│  ├─carrier
│  ├─chat
│  ├─group
│  ├─mypage
│  ├─order
│  ├─payment
│  ├─review
│  ├─search
│  ├─store
│  └─storeKeeperScreens
│
├─App.js
├─index.js
└─utils
```

-->
