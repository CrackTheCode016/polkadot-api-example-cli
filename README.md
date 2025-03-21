<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate">
    <img src="https://cryptologos.cc/logos/polkadot-new-dot-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center"> Polkadot API Account Watcher</h3>

  <p align="center">
    This was built using the <a href="https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate">Polkadot API Typescript Boilerplate <a/> 
    <br />
  </p>
</div>

A decentralized command-line application that monitors a user's account on the Polkadot relay chain for the `system.remarkWithEvent` extrinsic. When a remark addressed to the specified account is detected, the application plays the iconic "You've Got Mail!" sound byte.

## Features

- Monitors the Westend Test Network for `system.remarkWithEvent` extrinsics.
- Uses a light client powered by [`smoldot`](https://github.com/smol-dot/smoldot) for efficient synchronization.
- Detects remarks addressed to a specific account and plays a sound notification.
- Displays the sender's account and the hash of the remark.

## Prerequisites

Before starting, ensure the following tools and dependencies are installed:

- `npm` (or an alternative package manager)
- `node`
- `git`
- [Polkadot.js Browser Extension (wallet)](https://polkadot.js.org/extension/)

Additionally, you will need an account with Westend tokens. Refer to the following resources for assistance:

- [Westend Faucet](https://faucet.polkadot.io/westend)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/CrackTheCode016/polkadot-api-example-cli --branch empty-cli
    cd polkadot-api-example-cli
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the application and specify the account to monitor:

    ```bash
    npm start -- --account <account-address>
    ```

    Example:

    ```bash
    npm start -- --account 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
    ```

2. The application will display the following output and start monitoring the specified account:

    ```
     __        __   _    _____   __  __       _ _  __        __    _       _
     \ \      / /__| |__|___ /  |  \/  | __ _(_) | \ \      / /_ _| |_ ___| |__   ___ _ __
      \ \ /\ / / _ \ '_ \ |_ \  | |\/| |/ _` | | |  \ \ /\ / / _` | __/ __| '_ \ / _ \ '__|
       \ V  V /  __/ |_) |__) | | |  | | (_| | | |   \ V  V / (_| | || (__| | | |  __/ |
        \_/\_/ \___|_.__/____/  |_|  |_|\__,_|_|_|    \_/\_/ \__,_|\__\___|_| |_|\___|_|

    Watching account: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
    ```

3. When a remark is detected, the application will play the "You've Got Mail!" sound and display the following:

    ```
    You've got mail!
    From: 5Cm8yiG45rqrpyV2zPLrbtr8efksrRuCXcqcB4xj8AejfcTB
    Hash: 0xb6999c9082f5b1dede08b387404c9eb4eb2deee4781415dfa7edf08b87472050
    ```

## Testing the Application

1. Navigate to the [PAPI Dev Console > Extrinsics](https://dev.papi.how/extrinsics#networkId=westend&endpoint=light-client).
2. Select the `System` pallet and the `remark_with_event` call.
3. Input a remark in the format `address+email`. For example, if monitoring `5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY`, input:

    ```
    5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY+email
    ```

4. Submit the extrinsic and sign it using the Polkadot.js browser wallet. The application will detect the remark and display the output.

## Extending the Application

This application can be extended in various ways, such as:

- Implementing a chatroom using remarks.
- Leveraging rollups on Polkadot to enhance functionality.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/CrackTheCode016/polkadot-api-ts-boilerplate.svg?style=for-the-badge
[contributors-url]: https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CrackTheCode016/polkadot-api-ts-boilerplate.svg?style=for-the-badge
[forks-url]: https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate/network/members
[stars-shield]: https://img.shields.io/github/stars/CrackTheCode016/polkadot-api-ts-boilerplate.svg?style=for-the-badge
[stars-url]: https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate/stargazers
[issues-shield]: https://img.shields.io/github/issues/CrackTheCode016/polkadot-api-ts-boilerplate.svg?style=for-the-badge
[issues-url]: https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate/issues
[license-shield]: https://img.shields.io/github/license/CrackTheCode016/polkadot-api-ts-boilerplate.svg?style=for-the-badge
[license-url]: https://github.com/CrackTheCode016/polkadot-api-ts-boilerplate/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 