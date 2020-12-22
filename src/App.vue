<template>
  <div id="app">
    <div class="paper-wrapper">
      <PaperBuilderComp
        :paperLayout="layoutWidthSections"
        :paperTreeNodes="paperTreeNodes"
        :modules="modules"
        :readonly="false"
        @propertiesChange="onPropertiesChange"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PaperBuilderComp from './lib/index';
import LayoutProperties from './lib/models/layoutProperties';
import PaperTreeNode from '@netm/cb-question-viewer/lib/models/paperTreeNode';
import CustomBuildableModule from './components/customBuildableModule'
import './lib/styles/index.less';
import '@netm/cb-question-viewer/lib/styles/index.less';

@Component({
  components: {
    PaperBuilderComp
  }
})
export default class App extends Vue {
  private paperLayout: LayoutProperties = {
    id: 0,
    type: 'paperModule',
    text: '你好',
    style: {
      fontSize: 30,
      position: 'relative'
    },
    extras: {
      paperExtra: [
        {
          id: 0.6978452830056274,
          type: 'subTitleModule',
          style: {
            textAlign: 'center',
            fontSize: 20
          },
          text: '副标题'
        },
        {
          id: 0.42084208949786905,
          type: 'studentInfoModule',
          style: {
            textAlign: 'center',
            fontSize: 14,
            padding: '10px'
          },
          text: '学校：_______________ 班级：_______________ 姓名：_______________ 学号：_______________'
        },
        {
          id: 0.15337061805363383,
          type: 'noticeModule',
          style: {
            textAlign: 'left',
            fontSize: 12,
            color: '#999',
            whiteSpace: 'pre-line',
            padding: '2px 4px'
          },
          text: '1．答题前填写好自己的姓名、班级、考号等信息\n 2．请将答案正确填写在答题卡上'
        },
        {
          id: 0.11204043790631268,
          type: 'scoreModule',
          style: {
            textAlign: 'center'
          }
        },
        {
          id: 0.5990161461321002,
          type: 'paperInfoModule',
          style: {
            textAlign: 'center',
            fontSize: 14,
            padding: '10px'
          },
          text: '考试范围：xxx；考试时间：100分钟；命题人：xxx'
        },
        {
          id: 0.4943843606205145,
          type: 'secretTagModule',
          draggable: false,
          style: {
            textAlign: 'left',
            fontSize: 14,
            color: '#0000ff',
            position: 'absolute',
            left: 88,
            top: 12
          },
          text: '绝密★启用前'
        },
        {
          id: 0.7726285829637205,
          text: '学校：_______________ 班级：_______________ 姓名：_______________ 学号：_______________',
          draggable: false,
          style: {
            fontSize: 14,
            textAlign: 'center',
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            transformOrigin: 'top right',
            transform: 'translateX(-100%) rotate(-90deg)',
            width: 1131.4
          },
          type: 'gutterModule'
        }
      ]
    },
    children: [
    ]
  }

  private modules = {
    // commonModule: CustomBuildableModule
  }

  private paperTreeNodes: any[] = [
    {
      id: 12,
      paperId: null,
      resourceId: null,
      resourceType: 1,
      parentId: null,
      previousId: -1,
      nextId: null,
      sectionTypeTagId: 31412,
      position: 1,
      sectionDTO: {
        id: null,
        paperId: null,
        name: '选择题',
        description: null
      },
      questionDTO: null,
      children: [
        {
          id: 1,
          paperId: null,
          resourceId: null,
          resourceType: 0,
          parentId: null,
          previousId: -1,
          nextId: null,
          sectionTypeTagId: null,
          position: 1,
          sectionDTO: null,
          questionDTO: {
            id: null,
            score: null,
            bankQuestionId: 62,
            paperId: null,
            type: 1,
            orgId: -1,
            content: {
              type: 1,
              title: '<p>我要加个选择23</p>',
              analyse: null,
              choicesAnswers: [
                {
                  id: 0,
                  content: '<p>嗯嗯</p>',
                  correct: true
                },
                {
                  id: 1,
                  content: '<p>啊啊</p>',
                  correct: false
                },
                {
                  id: 1607419682119,
                  content: '<p>da</p>',
                  correct: false
                }
              ]
            },
            subIdList: null,
            subQuestionDTOS: null,
            sectionTypeTagId: 31412,
            sectionTypeTagDTO: null,
            difficultyDegree: 0,
            knowledgeLeafTagIdList: null,
            knowledgeLeafTagDTOList: null
          },
          children: null
        },
        {
          id: 2,
          paperId: null,
          resourceId: null,
          resourceType: 0,
          parentId: null,
          previousId: -1,
          nextId: null,
          sectionTypeTagId: null,
          position: 2,
          sectionDTO: null,
          questionDTO: {
            id: null,
            score: null,
            bankQuestionId: 67,
            paperId: null,
            type: 5,
            orgId: -1,
            content: {
              type: 5,
              title: '<p>fdsfsafas</p>',
              analyse: '<p>ffdasfsafsafsa</p>',
              stdAnswer: '<p>fsadfsadffdsafas</p>'
            },
            subIdList: null,
            subQuestionDTOS: null,
            sectionTypeTagId: 31412,
            sectionTypeTagDTO: null,
            difficultyDegree: 0,
            knowledgeLeafTagIdList: null,
            knowledgeLeafTagDTOList: null
          },
          children: null
        }
      ]
    }
  ];

  get layoutWidthSections (): LayoutProperties {
    let indexOffset = 0;
    let sectionLayouts: LayoutProperties[] = this.paperTreeNodes.map((sectionNode, index) => {
      let layoutProperties: LayoutProperties = {
        id: sectionNode.id,
        type: 'sectionModule',
        props: { ...sectionNode.sectionDTO, index },
        childrenSortable: false,
        children: sectionNode.children.map((questionNode: any, index: number) => ({
          id: questionNode.id,
          type: 'questionModule',
          props: { index: index + indexOffset, ...questionNode.questionDTO }
        }))
      };
      indexOffset += layoutProperties.children!.length;
      return layoutProperties;
    });
    return {
      ...this.paperLayout,
      extras: {
        paperExtra: this.paperLayout.extras?.paperExtra || []
      },
      children: sectionLayouts
    }
  }

  private onPropertiesChange (properties: LayoutProperties) {
    switch (properties.type) {
      case 'sectionModule':
      case 'questionModule':
        break;
      default:
        break;
    }
  }

  private onDelete () { }
}
</script>
