import { createCodeHighlighter } from '@lib/highlightCode'
import { Slide } from 'components/Slide'
import React from 'react'
import { memo } from 'react'
import { Paragraph, Square, Stack, Theme, XStack, YStack, styled } from 'tamagui'

const highlightCode = createCodeHighlighter()

const inputSnippet = highlightCode(
  `
const themes = {
  light: {
    background: '#fff',
    color: '#000',
  },
  dark: {
    background: '#000',
    color: '#fff'
  }
}
`,
  'tsx'
)

const outputSnippet = highlightCode(
  `.t_light {
  --background: #fff;
  --color: #000;
}

.t_dark {
  --background: #000;
  --color: #fff;
}
`,
  'tsx'
)

const inputSnippetSub = highlightCode(
  `
const themes = {
  light_red: {
    background: 'white',
    color: 'red',
  },
  dark_red: {
    background: 'red',
    color: 'white'
  }
}
`,
  'tsx'
)

const outputSnippetSub = highlightCode(
  `.t_light_red {
  --background: white;
  --color: red;
}

.t_dark_red {
  --background: red;
  --color: white;
}
`,
  'tsx'
)

const snippetUsage = highlightCode(
  `
import { Stack, Text, Theme } from '@tamagui/core'
  
export default () => (
  <Theme name="light">
    <Stack backgroundColor="$background">
      <Text color="$color">
        Hello world
      </Text>
    </Stack>
  </Theme>
)
`,
  'tsx'
)

const snippetUsage2 = highlightCode(
  `
import { Stack, Theme } from '@tamagui/core'
  
export default () => (
  <Theme name="light">
    <MyWidget />
  </Theme>
)

const MyWidget = () => (
  <Stack backgroundColor="$background">
    <Text color="$color">
      Hello world
    </Text>
  </Stack>
)
`,
  'tsx'
)

const snippetUsage3 = highlightCode(
  `
import { Stack, Theme } from '@tamagui/core'
  
export default () => (
  <Theme name="dark">
    <MyWidget />
  </Theme>
)

const MyWidget = () => (
  <Stack backgroundColor="$background">
    <Text color="$color">
      Hello world
    </Text>
  </Stack>
)
`,
  'tsx'
)

const snippetUsageComplex = highlightCode(
  `
import { Stack, Text } from '@tamagui/core'
  
export default () => (
  <Theme name="light">
    <MyWidget />

    <Theme name="dark">
      <MyWidget />
    </Theme>
  </Theme>
)
`,
  'tsx'
)

const snippetUsageInverse = highlightCode(
  `
import { Stack, Text } from '@tamagui/core'
  
export default () => (
  <Theme name="light">
    <MyWidget />

    <Theme inverse>
      <MyWidget />
    </Theme>
  </Theme>
)
`,
  'tsx'
)

const snippetUsageSub = highlightCode(
  `
import { Stack, Text } from '@tamagui/core'
  
export default () => (
  <Theme name="light">
    <Theme name="red">
      <MyWidget />
    </Theme>
  </Theme>
)
`,
  'tsx'
)

const snippetUsageInverseSub = highlightCode(
  `
import { Stack, Text } from '@tamagui/core'

export default () => (
  <Theme name="light">
    <Theme name="red">
      <MyWidget />

      {/* Now make it dark_red */}
      <Theme inverse>
        <MyWidget />
      </Theme>
    </Theme>
  </Theme>
)
`,
  'tsx'
)

const MyWidget = ({ text, stack }: any = {}) => (
  <Square size={250} bc={stack || '$background'} ai="center" jc="center">
    <Paragraph size="$8" color={text || '$color'}>
      Hello world
    </Paragraph>
  </Square>
)

const Container = styled(Stack, {
  miw: 400,
  mih: 400,
  ai: 'center',
  jc: 'center',
  space: true,
})

export default memo(() => {
  return (
    <Slide
      title="Themes"
      subTitle="@tamagui/core"
      stepsStrategy="replace"
      theme="pink"
      steps={[
        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: inputSnippet,
              },
              {
                type: 'code',
                content: outputSnippet,
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsage,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <Theme name="light">
                      <MyWidget />
                    </Theme>
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsage2,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <Theme name="light">
                      <MyWidget />
                    </Theme>
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsage3,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <Theme name="dark">
                      <MyWidget />
                    </Theme>
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsageComplex,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <Theme name="light">
                      <MyWidget />
                    </Theme>

                    <Theme name="dark">
                      <MyWidget />
                    </Theme>
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsageInverse,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <Theme name="light">
                      <MyWidget />
                    </Theme>

                    <Theme name="dark">
                      <MyWidget />
                    </Theme>
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'callout',
            content: `Sub-themes`,
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: inputSnippetSub,
              },
              {
                type: 'code',
                content: outputSnippetSub,
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsageSub,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <MyWidget text="red" stack="white" />
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'split-horizontal',
            content: [
              {
                type: 'code',
                content: snippetUsageInverseSub,
              },
              {
                type: 'content',
                content: (
                  <Container>
                    <MyWidget text="red" stack="white" />
                    <MyWidget text="white" stack="red" />
                  </Container>
                ),
              },
            ],
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-1.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-2.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `light`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-1.5.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark + inverse`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-4.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark_outlined`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-3.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `light_outlined`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-6.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark_purple`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-7.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark_purple_alt`,
          },
        ],

        [
          {
            type: 'image',
            variant: 'centered',
            fullscreen: true,
            image: require('../images/themes-5.png').default,
          },

          {
            type: 'text-overlay',
            variant: 'good',
            content: `dark_green_outlined`,
          },
        ],

        // [
        //   {
        //     type: 'content',
        //     content: (
        //       <YStack
        //         my={-100}
        //         als="center"
        //         mx="auto"
        //         ai="center"
        //         br="$4"
        //         ov="hidden"
        //         elevation="$5"
        //       >
        //         <video autoPlay loop style={{ width: 800, height: 800 }}>
        //           <source src="/talk/themes-demo.mp4" />
        //         </video>
        //       </YStack>
        //     ),
        //   },
        // ],

        // [
        //   {
        //     type: 'fullscreen',
        //     content: (
        //       <iframe
        //         width="100%"
        //         height="100%"
        //         src="https://www.youtube.com/embed/FqFLwud5l7g"
        //         title="beatgig-demo"
        //         frameBorder={0}
        //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //         allowFullScreen
        //       />
        //     ),
        //   },
        // ],
      ]}
    />
  )
})
