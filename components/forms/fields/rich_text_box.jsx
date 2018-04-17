import React from "react"
import PropTypes from "prop-types"
import { styled } from "../../../utils/theme"
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import decorate from "../../../utils/decorate"
import {stateToHTML} from 'draft-js-export-html';

export class RichTextBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    field: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
  }
  constructor(props) {
    super(props)
    if (props.value && props.value.replace(/<(?:.|\n)*?>/gm, ``) && props.value.trim().length > 7) {
      const blocksFromHTML = convertFromHTML(props.value)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      )
      this.state = {
        editorState: EditorState.createWithContent(state),
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }
  }

  titleLize(text) {
    const title = text.replace(/_/g, ` `)
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  handleEditorStateChange = editorState => {
    this.setState({ //eslint-disable-line
      editorState,
    })
    const { onChange } = this.props
    const content = stateToHTML(editorState.getCurrentContent()).split(/<br>\s+<br>/gm).join('</p><p>')
    if (onChange) onChange(content)
  }


  render() {
    const { editorState } = this.state
    return (
      <div className={this.props.className}>
        <label>{this.titleLize(this.props.field)}</label>
        <div className={`rich-text ${this.props.field}`}>
          <Editor
            className={`hello_${this.props.field}`}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.handleEditorStateChange}
          />
        </div>
        <input type="hidden" />
      </div>
    )
  }
}
export default decorate(
  styled`

.rich-text {
  max-width: 635px;
  border-radius: 5px;
}
.rdw-option-wrapper {
  padding: 5px;
  min-width: 25px;
  height: 20px;
  border-radius: 2px;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  text-transform: capitalize;
  transition: 0.3s;
}
.rdw-option-wrapper:hover {
  background: #f5f5f5;
}
.rdw-option-wrapper:active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-option-active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-option-disabled {
  opacity: 0.3;
  cursor: default;
}
.rdw-dropdown-wrapper {
  height: 30px;
  background: white;
  cursor: pointer;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  margin: 0 3px;
  text-transform: capitalize;
  background: white;
}
.rdw-dropdown-wrapper:focus {
  outline: none;
}
.rdw-dropdown-wrapper:hover {
  box-shadow: 1px 1px 0px #BFBDBD;
  background-color: #FFFFFF;
}
.rdw-dropdown-wrapper:active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-dropdown-carettoopen {
  height: 0px;
  width: 0px;
  position: absolute;
  top: 35%;
  right: 10%;
  border-top: 6px solid black;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
.rdw-dropdown-carettoclose {
  height: 0px;
  width: 0px;
  position: absolute;
  top: 35%;
  right: 10%;
  border-bottom: 6px solid black;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
.rdw-dropdown-selectedtext {
  display: flex;
  position: relative;
  height: 100%;
  align-items: center;
  padding: 0 5px;
}
.rdw-dropdown-optionwrapper {
  z-index: 100;
  position: relative;
  border: 1px solid #F1F1F1;
  width: 98%;
  background: white;
  border-radius: 2px;
  margin: 0;
  padding: 0;
  max-height: 250px;
  overflow-y: scroll;
}
.rdw-dropdown-optionwrapper:hover {
  box-shadow: 1px 1px 0px #BFBDBD;
  background-color: #FFFFFF;
}
.rdw-dropdownoption-default {
  min-height: 25px;
  display: flex;
  align-items: center;
  padding: 0 5px;
}
.rdw-dropdownoption-highlighted {
  background: #F1F1F1;
}
.rdw-dropdownoption-active {
  background: #f5f5f5;
}
.rdw-dropdownoption-disabled {
  opacity: 0.3;
  cursor: default;
}
.rdw-inline-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-inline-dropdown {
  width: 50px;
}
.rdw-inline-dropdownoption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-block-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-block-dropdown {
  width: 110px;
}
.rdw-fontsize-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-fontsize-dropdown {
  min-width: 40px;
}
.rdw-fontsize-option {
  display: flex;
  justify-content: center;
}
.rdw-fontfamily-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-fontfamily-dropdown {
  width: 115px;
}
.rdw-fontfamily-placeholder {
  white-space: nowrap;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rdw-fontfamily-optionwrapper {
  width: 140px;
}
.rdw-list-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-list-dropdown {
  width: 50px;
  z-index: 90;
}
.rdw-list-dropdownOption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-text-align-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-text-align-dropdown {
  width: 50px;
  z-index: 90;
}
.rdw-text-align-dropdownOption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-right-aligned-block {
  text-align: right;
}
.rdw-left-aligned-block {
  text-align: left !important;
}
.rdw-center-aligned-block {
  text-align: center !important;
}
.rdw-justify-aligned-block {
  text-align: justify !important;
}
.rdw-right-aligned-block > div {
  display: inline-block;
}
.rdw-left-aligned-block > div {
  display: inline-block;
}
.rdw-center-aligned-block > div {
  display: inline-block;
}
.rdw-justify-aligned-block > div {
  display: inline-block;
}
.rdw-colorpicker-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-colorpicker-modal {
  position: absolute;
  top: 35px;
  left: 5px;
  display: flex;
  flex-direction: column;
  width: 175px;
  height: 175px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
}
.rdw-colorpicker-modal-header {
  display: flex;
  padding-bottom: 5px;
}
.rdw-colorpicker-modal-style-label {
  font-size: 15px;
  width: 50%;
  text-align: center;
  cursor: pointer;
  padding: 0 10px 5px;
}
.rdw-colorpicker-modal-style-label-active {
  border-bottom: 2px solid #0a66b7;
}
.rdw-colorpicker-modal-options {
  margin: 5px auto;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  overflow: scroll;
}
.rdw-colorpicker-cube {
  width: 22px;
  height: 22px;
  border: 1px solid #F1F1F1;
}
.rdw-colorpicker-option {
  margin: 3px;
  padding: 0;
  min-height: 20px;
  border: none;
  width: 22px;
  height: 22px;
  min-width: 22px;
  box-shadow: 1px 2px 1px #BFBDBD inset;
}
.rdw-colorpicker-option:hover {
  box-shadow: 1px 2px 1px #BFBDBD;
}
.rdw-colorpicker-option:active {
  box-shadow: -1px -2px 1px #BFBDBD;
}
.rdw-colorpicker-option-active {
  box-shadow: 0px 0px 2px 2px #BFBDBD;
}
.rdw-link-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-link-dropdown {
  width: 50px;
}
.rdw-link-dropdownOption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-link-dropdownPlaceholder {
  margin-left: 8px;
}
.rdw-link-modal {
  position: absolute;
  top: 35px;
  left: 5px;
  display: flex;
  flex-direction: column;
  width: 235px;
  height: 205px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
}
.rdw-link-modal-label {
  font-size: 15px;
}
.rdw-link-modal-input {
  margin-top: 5px;
  border-radius: 2px;
  border: 1px solid #F1F1F1;
  height: 25px;
  margin-bottom: 15px;
  padding: 0 5px;
}
.rdw-link-modal-input:focus {
  outline: none;
}
.rdw-link-modal-buttonsection {
  margin: 0 auto;
}
.rdw-link-modal-target-option {
  margin-bottom: 20px;
}
.rdw-link-modal-target-option > span {
  margin-left: 5px;
}
.rdw-link-modal-btn {
  margin-left: 10px;
  width: 75px;
  height: 30px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  cursor: pointer;
  background: white;
  text-transform: capitalize;
}
.rdw-link-modal-btn:hover {
  box-shadow: 1px 1px 0px #BFBDBD;
}
.rdw-link-modal-btn:active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-link-modal-btn:focus {
  outline: none !important;
}
.rdw-link-modal-btn:disabled {
  background: #ece9e9;
}
.rdw-link-dropdownoption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-history-dropdown {
  width: 50px;
}
.rdw-embedded-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-embedded-modal {
  position: absolute;
  top: 35px;
  left: 5px;
  display: flex;
  flex-direction: column;
  width: 235px;
  height: 180px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  justify-content: space-between;
  box-shadow: 3px 3px 5px #BFBDBD;
}
.rdw-embedded-modal-header {
  font-size: 15px;
  display: flex;
}
.rdw-embedded-modal-header-option {
  width: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.rdw-embedded-modal-header-label {
  width: 95px;
  border: 1px solid #f1f1f1;
  margin-top: 5px;
  background: #6EB8D4;
  border-bottom: 2px solid #0a66b7;
}
.rdw-embedded-modal-link-section {
  display: flex;
  flex-direction: column;
}
.rdw-embedded-modal-link-input {
  width: 88%;
  height: 35px;
  margin: 10px 0;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  font-size: 15px;
  padding: 0 5px;
}
.rdw-embedded-modal-link-input-wrapper {
  display: flex;
  align-items: center;
}
.rdw-embedded-modal-link-input:focus {
  outline: none;
}
.rdw-embedded-modal-btn-section {
  display: flex;
  justify-content: center;
}
.rdw-embedded-modal-btn {
  margin: 0 3px;
  width: 75px;
  height: 30px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  cursor: pointer;
  background: white;
  text-transform: capitalize;
}
.rdw-embedded-modal-btn:hover {
  box-shadow: 1px 1px 0px #BFBDBD;
}
.rdw-embedded-modal-btn:active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-embedded-modal-btn:focus {
  outline: none !important;
}
.rdw-embedded-modal-btn:disabled {
  background: #ece9e9;
}
.rdw-embedded-modal-size {
  align-items: center;
  display: flex;
  margin: 8px 0;
  justify-content: space-between;
}
.rdw-embedded-modal-size-input {
  width: 80%;
  height: 20px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  font-size: 12px;
}
.rdw-embedded-modal-size-input:focus {
  outline: none;
}
.rdw-emoji-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-emoji-modal {
  overflow: auto;
  position: absolute;
  top: 35px;
  left: 5px;
  display: flex;
  flex-wrap: wrap;
  width: 235px;
  height: 180px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
}
.rdw-emoji-icon {
  margin: 2.5px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rdw-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.rdw-spinner > div {
  width: 12px;
  height: 12px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.rdw-spinner .rdw-bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.rdw-spinner .rdw-bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
.rdw-image-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-image-modal {
  position: absolute;
  top: 35px;
  left: 5px;
  display: flex;
  flex-direction: column;
  width: 235px;
  border: 1px solid #F1F1F1;
  padding: 15px;
  border-radius: 2px;
  z-index: 100;
  background: white;
  box-shadow: 3px 3px 5px #BFBDBD;
}
.rdw-image-modal-header {
  font-size: 15px;
  margin: 10px 0;
  display: flex;
}
.rdw-image-modal-header-option {
  width: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.rdw-image-modal-header-label {
  width: 80px;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  margin-top: 5px;
}
.rdw-image-modal-header-label-highlighted {
  background: #6EB8D4;
  border-bottom: 2px solid #0a66b7;
}
.rdw-image-modal-upload-option {
  width: 100%;
  color: gray;
  cursor: pointer;
  display: flex;
  border: none;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  outline: 2px dashed gray;
  outline-offset: -10px;
  margin: 10px 0;
  padding: 9px 0;
}
.rdw-image-modal-upload-option-highlighted {
  outline: 2px dashed #0a66b7;
}
.rdw-image-modal-upload-option-label {
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.rdw-image-modal-upload-option-label span{
  padding: 0 20px;
}
.rdw-image-modal-upload-option-image-preview {
  max-width: 100%;
  max-height: 200px;
}
.rdw-image-modal-upload-option-input {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.rdw-image-modal-url-section {
  display: flex;
  align-items: center;
}
.rdw-image-modal-url-input {
  width: 90%;
  height: 35px;
  margin: 15px 0 12px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  font-size: 15px;
  padding: 0 5px;
}
.rdw-image-modal-btn-section {
  margin: 10px auto 0;
}
.rdw-image-modal-url-input:focus {
  outline: none;
}
.rdw-image-modal-btn {
  margin: 0 5px;
  width: 75px;
  height: 30px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  cursor: pointer;
  background: white;
  text-transform: capitalize;
}
.rdw-image-modal-btn:hover {
  box-shadow: 1px 1px 0px #BFBDBD;
}
.rdw-image-modal-btn:active {
  box-shadow: 1px 1px 0px #BFBDBD inset;
}
.rdw-image-modal-btn:focus {
  outline: none !important;
}
.rdw-image-modal-btn:disabled {
  background: #ece9e9;
}
.rdw-image-modal-spinner {
  position: absolute;
  top: -3px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
.rdw-image-modal-alt-input {
  width: 70%;
  height: 20px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  font-size: 12px;
  margin-left: 5px;
}
.rdw-image-modal-alt-input:focus {
  outline: none;
}
.rdw-image-modal-alt-lbl {
  font-size: 12px;
}
.rdw-image-modal-size {
  align-items: center;
  display: flex;
  margin: 8px 0;
  justify-content: space-between;
}
.rdw-image-modal-size-input {
  width: 40%;
  height: 20px;
  border: 1px solid #F1F1F1;
  border-radius: 2px;
  font-size: 12px;
}
.rdw-image-modal-size-input:focus {
  outline: none;
}
.rdw-image-mandatory-sign {
  color: red;
  margin-left: 3px;
  margin-right: 3px;
}
.rdw-remove-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  position: relative;
}
.rdw-history-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.rdw-history-dropdownoption {
  height: 40px;
  display: flex;
  justify-content: center;
}
.rdw-history-dropdown {
  width: 50px;
}
.rdw-link-decorator-wrapper {
  position: relative;
}
.rdw-link-decorator-icon {
  position: absolute;
  left: 40%;
  top: 0;
  cursor: pointer;
  background-color: white;
}
.rdw-mention-link {
  text-decoration: none;
  color: #1236ff;
  background-color: #f0fbff;
  padding: 1px 2px;
  border-radius: 2px;
}
.rdw-suggestion-wrapper {
  position: relative;
}
.rdw-suggestion-dropdown {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid #F1F1F1;
  min-width: 100px;
  max-height: 150px;
  overflow: auto;
  background: white;
  z-index: 100;
}
.rdw-suggestion-option {
  padding: 7px 5px;
  border-bottom: 1px solid #f1f1f1;
}
.rdw-suggestion-option-active {
  background-color: #F1F1F1;
}
.rdw-hashtag-link {
  text-decoration: none;
  color: #1236ff;
  background-color: #f0fbff;
  padding: 1px 2px;
  border-radius: 2px;
}
.rdw-image-alignment-options-popup {
  position: absolute;;
  background: white;
  display: flex;
  padding: 5px 2px;
  border-radius: 2px;
  border: 1px solid #F1F1F1;
  width: 105px;
  cursor: pointer;
  z-index: 100;
}
.rdw-alignment-option-left {
  justify-content: flex-start;
}
.rdw-image-alignment-option {
  height: 15px;
  width: 15px;
  min-width: 15px;
}
.rdw-image-alignment {
  position: relative;
}
.rdw-image-imagewrapper {
  position: relative;
}
.rdw-image-center {
  display: flex;
  justify-content: center;
}
.rdw-image-left {
  display: flex;
}
.rdw-image-right {
  display: flex;
  justify-content: flex-end;
}
.rdw-image-alignment-options-popup-right {
  right: 0;
}
.rdw-editor-main {
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.rdw-editor-toolbar {
  padding: 6px 5px 0;
  border-radius: 2px;
  border: 1px solid #F1F1F1;
  display: flex;
  justify-content: flex-start;
  background: white;
  flex-wrap: wrap;
  font-size: 15px;
  margin-bottom: 5px;
  user-select: none;
}
.public-DraftStyleDefault-block {
  margin: 1em 0;
}
.rdw-editor-wrapper:focus {
  outline: none;
}
.rdw-editor-wrapper {
  box-sizing: content-box;
}
.rdw-editor-main blockquote {
  border-left: 5px solid #f1f1f1;
  padding-left: 5px;
}
.rdw-editor-main pre {
  background: #f1f1f1;
  border-radius: 3px;
  padding: 1px 10px;
}
.DraftEditor-editorContainer,.DraftEditor-root,.public-DraftEditor-content{
    height:inherit;
    text-align:initial
}
.public-DraftEditor-content[contenteditable=true]{
    -webkit-user-modify:read-write-plaintext-only
}
.DraftEditor-root{
    position:relative
}
.DraftEditor-editorContainer{
    background-color:rgba(255,255,255,0);
    border-left:.1px solid transparent;
    position:relative;
    z-index: 1;
    padding: 0 12px;
}
.public-DraftEditor-block{
    position:relative
}
.DraftEditor-alignLeft .public-DraftStyleDefault-block{
    text-align:left
}
.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root{
    left:0;
    text-align:left
}
.DraftEditor-alignCenter .public-DraftStyleDefault-block{
    text-align:center
}
.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root{
    margin:0 auto;
    text-align:center;
    width:100%
}
.DraftEditor-alignRight .public-DraftStyleDefault-block{
    text-align:right
}
.DraftEditor-alignRight .public-DraftEditorPlaceholder-root{
    right:0;
    text-align:right
}
.public-DraftEditorPlaceholder-root{
    color:#9197a3;
    position:absolute;
    z-index:0
}
.public-DraftEditorPlaceholder-hasFocus{
    color:#bdc1c9
}
.DraftEditorPlaceholder-hidden{
    display:none
}
.public-DraftStyleDefault-block{
    position:relative;
    white-space:pre-wrap
}
.public-DraftStyleDefault-ltr{
    direction:ltr;
    text-align:left
}
.public-DraftStyleDefault-rtl{
    direction:rtl;
    text-align:right
}
.public-DraftStyleDefault-listLTR{
    direction:ltr
}
.public-DraftStyleDefault-listRTL{
    direction:rtl
}
.public-DraftStyleDefault-ol,.public-DraftStyleDefault-ul{
    margin:16px 0;
    padding:0
}
.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR{
    margin-left:1.5em
}
.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL{
    margin-right:1.5em
}
.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR{
    margin-left:3em
}
.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL{
    margin-right:3em
}
.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR{
    margin-left:4.5em
}
.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL{
    margin-right:4.5em
}
.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR{
    margin-left:6em
}
.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL{
    margin-right:6em
}
.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR{
    margin-left:7.5em
}
.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL{
    margin-right:7.5em
}
.public-DraftStyleDefault-unorderedListItem{
    list-style-type:square;
    position:relative
}
.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0{
    list-style-type:disc
}
.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1{
    list-style-type:circle
}
.public-DraftStyleDefault-orderedListItem{
    list-style-type:none;
    position:relative
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before{
    left:-36px;
    position:absolute;
    text-align:right;
    width:30px
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before{
    position:absolute;
    right:-36px;
    text-align:left;
    width:30px
}
.public-DraftStyleDefault-orderedListItem:before{
    content:counter(ol0) ". ";
    counter-increment:ol0
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before{
    content:counter(ol1) ". ";
    counter-increment:ol1
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before{
    content:counter(ol2) ". ";
    counter-increment:ol2
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before{
    content:counter(ol3) ". ";
    counter-increment:ol3
}
.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before{
    content:counter(ol4) ". ";
    counter-increment:ol4
}
.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset{
    counter-reset:ol0
}
.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset{
    counter-reset:ol1
}
.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset{
    counter-reset:ol2
}
.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset{
    counter-reset:ol3
}
.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset{
    counter-reset:ol4
}


  `,
  RichTextBox,
)
